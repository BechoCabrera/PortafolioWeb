import { Component, computed, input } from '@angular/core';

import {
  ArchitectureConnection,
  ArchitectureNode,
  ProjectArchitecture,
} from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-architecture',
  standalone: true,
  templateUrl: './project-architecture.html',
  styleUrl: './project-architecture.scss',
})
export class ProjectArchitectureComponent {
  readonly architecture = input.required<ProjectArchitecture>();
  readonly sectionLabel = input('Project architecture');
  readonly flowLabel = input('Main architecture flow');
  readonly servicesLabel = input('Supporting services');

  protected readonly mainFlow = computed(() => {
    const architecture = this.architecture();
    const mainNodes = architecture.nodes.filter((node) => node.lane !== 'side');
    const mainNodeIds = new Set(mainNodes.map((node) => node.id));
    const mainConnections = architecture.connections.filter(
      (connection) =>
        mainNodeIds.has(connection.from) && mainNodeIds.has(connection.to),
    );

    const indegree = new Map<string, number>();
    for (const node of mainNodes) {
      indegree.set(node.id, 0);
    }

    for (const connection of mainConnections) {
      indegree.set(connection.to, (indegree.get(connection.to) ?? 0) + 1);
    }

    const startNode =
      mainNodes.find((node) => (indegree.get(node.id) ?? 0) === 0) ??
      mainNodes[0];

    if (!startNode) {
      return [] as readonly ArchitectureNode[];
    }

    const ordered: ArchitectureNode[] = [startNode];
    const visited = new Set<string>([startNode.id]);
    let current = startNode;

    while (true) {
      const nextConnection = mainConnections.find(
        (connection) => connection.from === current.id,
      );
      if (!nextConnection) {
        break;
      }

      const nextNode = mainNodes.find((node) => node.id === nextConnection.to);
      if (!nextNode || visited.has(nextNode.id)) {
        break;
      }

      ordered.push(nextNode);
      visited.add(nextNode.id);
      current = nextNode;
    }

    return ordered;
  });

  protected readonly sideServices = computed(() =>
    this.architecture().nodes.filter((node) => node.lane === 'side'),
  );

  protected findConnection(
    from: string,
    to: string,
  ): ArchitectureConnection | null {
    return (
      this.architecture().connections.find(
        (connection) => connection.from === from && connection.to === to,
      ) ?? null
    );
  }

  protected findRelatedSideConnections(
    nodeId: string,
  ): readonly ArchitectureConnection[] {
    return this.architecture().connections.filter(
      (connection) => connection.from === nodeId || connection.to === nodeId,
    );
  }

  protected trackConnection(connection: ArchitectureConnection): string {
    return `${connection.from}-${connection.to}-${connection.label ?? ''}`;
  }

  protected indexLabel(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
