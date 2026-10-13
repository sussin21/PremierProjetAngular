import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },
  { path: 'conferences', loadChildren: () => import('./conferences/conferences.routes').then(m => m.CONFERENCE_ROUTES) },
  { path: 'list', redirectTo: 'conferences/list', pathMatch: 'full' },
  { path: 'details/:id', redirectTo: 'conferences/details/:id', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./notfound/notfound').then(m => m.Notfound) },
];
