import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConferenceCard } from './conference-card';
describe('ConferenceCard', () => {
 it('passes the selected conference to its parent', async () => {
  TestBed.configureTestingModule({ imports: [ConferenceCard], providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(ConferenceCard);
  const conf = { id: 1, name: 'Angular', description: 'Signals', date: '2026-11-05', place: 'Tunis', price: 20, nbPlaces: 0 };
  fixture.componentRef.setInput('conference', conf);
  const selected = vi.fn(); fixture.componentInstance.selected.subscribe(selected);
  await fixture.whenStable(); fixture.nativeElement.querySelector('button').click();
  expect(selected).toHaveBeenCalledWith(conf);
  expect(fixture.nativeElement.textContent).toContain('Complet');
 });
});
