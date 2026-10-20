import { Routes, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Conferance } from '../services/conferance';
export const CONFERENCE_ROUTES: Routes = [{
  path: '', loadComponent: () => import('./conferences-layout').then(m => m.ConferencesLayout),
  children: [
    { path: 'new', loadComponent: () => import('../conference-form/conference-form').then(m => m.ConferenceForm) },
    { path: 'edit/:id', loadComponent: () => import('../conference-form/conference-form').then(m => m.ConferenceForm) },
    { path: 'list', loadComponent: () => import('../conferance-list/conferance-list').then(m => m.ConferanceList), data: { title: 'Conférences' } },
    { path: 'details/:id', loadComponent: () => import('../conferance-details/conferance-details').then(m => m.ConferanceDetails),
      resolve: { resolvedConference: (route: ActivatedRouteSnapshot) => inject(Conferance).getById(Number(route.paramMap.get('id'))) ?? null } },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
  ],
}];

