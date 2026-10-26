import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Conference } from '../models/conference';
import { Conferance } from '../services/conferance';
// Resolve failures as visible route data rather than cancelling navigation silently.
export const conferenceResolver: ResolveFn<Conference | null> = route => {
  const id = Number(route.paramMap.get('id'));
  if (!Number.isInteger(id) || id < 1) return of(null);
  return inject(Conferance).getById(id).pipe(catchError(() => of(null)));
};
