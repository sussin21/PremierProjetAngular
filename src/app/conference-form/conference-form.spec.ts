import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ConferenceForm } from './conference-form';
import { Conferance } from '../services/conferance';
describe('ConferenceForm', () => {
 beforeEach(() => TestBed.configureTestingModule({ imports: [ConferenceForm], providers: [provideRouter([])] }));
 it('rejects invalid values and creates a conference only after validation', async () => {
  const fixture = TestBed.createComponent(ConferenceForm); await fixture.whenStable();
  const form = fixture.componentInstance;
  const service = TestBed.inject(Conferance);
  const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
  form.submit(); expect(service.count()).toBe(3);
  form.form.setValue({ name: '   ', description: 'A valid description', logistics: { date: '2026-12-01', place: 'Tunis' }, price: 0, nbPlaces: 1 });
  expect(form.form.invalid).toBe(true);
  form.form.controls.name.setValue('New Angular');
  form.form.controls.nbPlaces.setValue(1.5); expect(form.form.invalid).toBe(true);
  form.form.controls.nbPlaces.setValue(5); form.submit();
  expect(service.count()).toBe(4); expect(navigate).toHaveBeenCalled();
 });
 it('loads the existing conference when editing', async () => {
  const fixture = TestBed.createComponent(ConferenceForm); fixture.componentRef.setInput('id', '1');
  await fixture.whenStable(); expect(fixture.componentInstance.form.controls.name.value).toBe('Angular Conference');
 });
});
