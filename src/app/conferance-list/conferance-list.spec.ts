import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ConferanceList } from './conferance-list';
describe('ConferanceList', () => {
 it('shows loading, an API error, then a successful retry', async () => {
  TestBed.configureTestingModule({ imports: [ConferanceList], providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()] });
  const fixture = TestBed.createComponent(ConferanceList); fixture.detectChanges();
  const http = TestBed.inject(HttpTestingController);
  expect(fixture.nativeElement.textContent).toContain('Chargement');
  http.expectOne('http://localhost:3000/conferences').error(new ProgressEvent('error'));
  await fixture.whenStable(); expect(fixture.nativeElement.textContent).toContain('Serveur injoignable');
  fixture.nativeElement.querySelector('button').click();
  http.expectOne('http://localhost:3000/conferences').flush([]);
  await fixture.whenStable(); expect(fixture.nativeElement.textContent).toContain('Aucune conférence'); http.verify();
 });
 it('connects Modifier to the edit route and Supprimer to the DELETE request', async () => {
  TestBed.configureTestingModule({ imports: [ConferanceList], providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()] });
  const fixture = TestBed.createComponent(ConferanceList); fixture.detectChanges();
  const http = TestBed.inject(HttpTestingController);
  http.expectOne('http://localhost:3000/conferences').flush([
   { id: 1, name: 'Angular Conference', description: 'Angular Signals', date: '2026-11-05', place: 'Tunis', price: 20, nbPlaces: 5 },
  ]);
  await fixture.whenStable();
  const element = fixture.nativeElement as HTMLElement;
  const editLink = Array.from(element.querySelectorAll('a')).find(a => a.textContent?.trim() === 'Modifier');
  expect(editLink?.getAttribute('href')).toBe('/conferences/edit/1');
  const deleteButton = Array.from(element.querySelectorAll('button')).find(button => button.textContent?.trim() === 'Supprimer');
  expect(deleteButton).toBeTruthy(); deleteButton!.click();
  const request = http.expectOne('http://localhost:3000/conferences/1');
  expect(request.request.method).toBe('DELETE');
  expect(element.textContent).toContain('Angular Conference');
  request.flush(null); await fixture.whenStable();
  expect(element.textContent).not.toContain('Angular Conference');
  expect(element.textContent).toContain('Aucune conférence'); http.verify();
 });
});
