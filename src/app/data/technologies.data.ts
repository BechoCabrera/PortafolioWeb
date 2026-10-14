import { TechnologyGroup } from '../core/models/technology.model';

export const technologyGroups: readonly TechnologyGroup[] = [
  {
    id: 'backend',
    label: 'BACKEND',
    technologies: [
      'C#',
      '.NET',
      'ASP.NET Core',
      'Entity Framework Core',
      'REST APIs',
    ],
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    technologies: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'SCSS'],
  },
  {
    id: 'database',
    label: 'DATABASE',
    technologies: ['SQL Server', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'architecture',
    label: 'ARCHITECTURE',
    technologies: [
      'Clean Architecture',
      'Onion Architecture',
      'SOLID',
      'Design Patterns',
    ],
  },
  {
    id: 'devops',
    label: 'DEVOPS',
    technologies: ['Git', 'Azure DevOps', 'CI/CD', 'Docker', 'IIS'],
  },
];
