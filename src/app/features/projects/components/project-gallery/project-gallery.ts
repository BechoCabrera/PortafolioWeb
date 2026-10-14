import { Component, computed, input, signal } from '@angular/core';

import { ProjectImageAsset } from '../../../../core/models/project.model';
import { ProjectImageComponent } from '../project-image/project-image';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [ProjectImageComponent],
  templateUrl: './project-gallery.html',
  styleUrl: './project-gallery.scss',
})
export class ProjectGalleryComponent {
  readonly images = input.required<readonly ProjectImageAsset[]>();
  readonly startIndex = input(0);
  readonly previousLabel = input('Previous image');
  readonly nextLabel = input('Next image');
  readonly galleryLabel = input('Project gallery');
  readonly thumbnailsLabel = input('Gallery thumbnails');
  readonly selectImageLabel = input('Select image');

  protected readonly activeIndex = signal(0);

  protected readonly activeImage = computed(() => {
    const current = this.images();
    if (current.length === 0) {
      return null;
    }

    const initialIndex = Math.min(
      Math.max(this.startIndex(), 0),
      current.length - 1,
    );

    if (this.activeIndex() >= current.length) {
      this.activeIndex.set(initialIndex);
    }

    return current[this.activeIndex()];
  });

  protected previous(): void {
    const total = this.images().length;
    if (total === 0) {
      return;
    }

    this.activeIndex.update((value) => (value - 1 + total) % total);
  }

  protected next(): void {
    const total = this.images().length;
    if (total === 0) {
      return;
    }

    this.activeIndex.update((value) => (value + 1) % total);
  }

  protected select(index: number): void {
    if (index < 0 || index >= this.images().length) {
      return;
    }

    this.activeIndex.set(index);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.select(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.select(this.images().length - 1);
    }
  }

  protected getCounterText(): string {
    const total = this.images().length;
    if (total === 0) {
      return '00 / 00';
    }

    const active = String(this.activeIndex() + 1).padStart(2, '0');
    const count = String(total).padStart(2, '0');
    return `${active} / ${count}`;
  }

  protected indexLabel(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
