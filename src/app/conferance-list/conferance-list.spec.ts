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
});
