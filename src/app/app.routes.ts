import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then((module) => module.Home),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/projects/project-detail/project-detail').then(
        (module) => module.ProjectDetail,
      ),
  },
  { path: 'projects', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
