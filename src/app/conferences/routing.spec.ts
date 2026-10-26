import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from '../app.routes';
import { Conferance } from '../services/conferance';
const conf = { id: 1, name: 'Angular Conference', description: 'Angular Signals', date: '2026-11-05', place: 'Tunis', price: 20, nbPlaces: 5 };
describe('Conference routing', () => {
 it('supports legacy links, query input binding, nested outlets and the wildcard', async () => {
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), { provide: Conferance, useValue: {
   conferences: signal([conf, { ...conf, id: 2, name: 'Java Conference' }]), loading: signal(false), saving: signal(false), error: signal(null),
   load: () => {}, getById: () => of(conf),
  } }] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl('/list?search=Angular');
  expect(harness.routeNativeElement?.textContent).toContain('ANGULAR CONFERENCE');
  expect(harness.routeNativeElement?.textContent).not.toContain('JAVA CONFERENCE');
  await harness.navigateByUrl('/details/1'); expect(harness.routeNativeElement?.textContent).toContain('Angular Conference');
  await harness.navigateByUrl('/conferences/edit/1');
  expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('input')?.value).toBe(conf.name);
  await harness.navigateByUrl('/missing'); expect(harness.routeNativeElement?.querySelector('img')).toBeTruthy();
 });
});
