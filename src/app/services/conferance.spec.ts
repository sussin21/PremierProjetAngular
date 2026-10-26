import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Conferance } from './conferance';
const conf = { id: 1, name: 'Angular', description: 'Angular Signals', date: '2026-11-05', place: 'Tunis', price: 20, nbPlaces: 5 };
const url = 'http://localhost:3000/conferences';
describe('Conferance HTTP state', () => {
 let service: Conferance; let http: HttpTestingController;
 beforeEach(() => {
  TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
  service = TestBed.inject(Conferance); http = TestBed.inject(HttpTestingController);
 });
 afterEach(() => http.verify());
 it('loads, reports network failure and retries', () => {
  service.load(); expect(service.loading()).toBe(true);
  http.expectOne(url).error(new ProgressEvent('error'));
  expect(service.loading()).toBe(false); expect(service.error()).toContain('npm run api');
  service.load(); http.expectOne(url).flush([conf]);
  expect(service.error()).toBeNull(); expect(service.count()).toBe(1);
 });
 it('cancels a superseded load', () => {
  service.load(); const first = http.expectOne(url); service.load();
  expect(first.cancelled).toBe(true); http.expectOne(url).flush([conf]);
  expect(service.loading()).toBe(false);
 });
 it('encodes the optional location filter and reads one item', () => {
  service.getAll('Tunis').subscribe();
  http.expectOne(r => r.url === url && r.params.get('place') === 'Tunis').flush([conf]);
  service.getById(1).subscribe(data => expect(data.id).toBe(1));
  http.expectOne(`${url}/1`).flush(conf);
 });
 it('uses all mutation verbs, server IDs and state changes only after success', () => {
  const { id, ...draft } = conf;
  service.create(draft).subscribe(); const post = http.expectOne(url);
  expect(post.request.method).toBe('POST'); expect(post.request.body.id).toBeUndefined();
  expect(service.count()).toBe(0); expect(service.saving()).toBe(true);
  post.flush(conf); expect(service.count()).toBe(1); expect(service.saving()).toBe(false);
  service.update({ ...conf, name: 'Updated' }).subscribe(); const put = http.expectOne(`${url}/1`);
  expect(put.request.method).toBe('PUT'); put.flush({ ...conf, name: 'Updated' });
  expect(service.conferences()[0].name).toBe('Updated');
  service.updatePlaces(1, 4).subscribe(); const patch = http.expectOne(`${url}/1`);
  expect(patch.request.method).toBe('PATCH'); expect(patch.request.body).toEqual({ nbPlaces: 4 }); patch.flush({ ...conf, nbPlaces: 4 });
  expect(service.conferences()[0].nbPlaces).toBe(4);
  service.remove(1).subscribe(); const del = http.expectOne(`${url}/1`);
  expect(del.request.method).toBe('DELETE'); del.flush(null); expect(service.count()).toBe(0);
 });
 it('retains records after a failed write and allows a retry', () => {
  service.load(); http.expectOne(url).flush([conf]);
  service.remove(1).subscribe({ error: () => {} });
  http.expectOne(`${url}/1`).flush({}, { status: 500, statusText: 'Server Error' });
  expect(service.count()).toBe(1); expect(service.error()).toContain('500'); expect(service.saving()).toBe(false);
  service.remove(1).subscribe(); http.expectOne(`${url}/1`).flush(null);
  expect(service.count()).toBe(0); expect(service.error()).toBeNull();
 });
 it('rejects duplicate pending writes and invalid place counts', () => {
  service.remove(1).subscribe(); const request = http.expectOne(`${url}/1`);
  const error = vi.fn(); service.remove(1).subscribe({ error });
  expect(error).toHaveBeenCalledOnce(); http.expectNone(`${url}/1`); request.flush(null);
  service.updatePlaces(1, -1).subscribe({ error }); expect(error).toHaveBeenCalledTimes(2);
 });
});
