import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ConferenceForm } from './conference-form';
const conf = { id: 1, name: 'Angular Conference', description: 'A valid description', date: '2026-12-01', place: 'Tunis', price: 0, nbPlaces: 5 };
describe('ConferenceForm', () => {
 beforeEach(() => TestBed.configureTestingModule({ imports: [ConferenceForm], providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()] }));
 afterEach(() => TestBed.inject(HttpTestingController).verify());
 it('validates before POST and navigates only on success', async () => {
  const fixture = TestBed.createComponent(ConferenceForm); await fixture.whenStable(); const component = fixture.componentInstance;
  const http = TestBed.inject(HttpTestingController); const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
  component.submit(); http.expectNone('http://localhost:3000/conferences');
  component.form.setValue({ name: '   ', description: conf.description, logistics: { date: conf.date, place: conf.place }, price: 0, nbPlaces: 1 });
  expect(component.form.invalid).toBe(true); component.form.controls.name.setValue(conf.name);
  component.form.controls.nbPlaces.setValue(1.5); expect(component.form.invalid).toBe(true);
  component.form.controls.nbPlaces.setValue(5); component.submit();
  expect(navigate).not.toHaveBeenCalled();
  http.expectOne('http://localhost:3000/conferences').flush({}, { status: 500, statusText: 'Failed' });
  expect(navigate).not.toHaveBeenCalled(); expect(component.form.controls.name.value).toBe(conf.name);
  component.submit(); http.expectOne('http://localhost:3000/conferences').flush(conf);
  expect(navigate).toHaveBeenCalledWith(['/conferences/list']);
 });
 it('loads resolved data and PUTs the complete edited record', async () => {
  const fixture = TestBed.createComponent(ConferenceForm); fixture.componentRef.setInput('id', '1'); fixture.componentRef.setInput('resolvedConference', conf);
  await fixture.whenStable(); expect(fixture.componentInstance.form.controls.name.value).toBe(conf.name);
  vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
  fixture.componentInstance.submit(); const request = TestBed.inject(HttpTestingController).expectOne('http://localhost:3000/conferences/1');
  expect(request.request.method).toBe('PUT'); expect(request.request.body).toEqual(conf); request.flush(conf);
 });
});
