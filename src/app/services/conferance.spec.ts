import { TestBed } from '@angular/core/testing';
import { Conferance } from './conferance';
describe('Conferance', () => {
  it('shares state across consumers and updates it immutably', () => {
    const service = TestBed.inject(Conferance);
    expect(TestBed.inject(Conferance)).toBe(service);
    const before = service.conferences();
    const created = service.create({ name: 'Test', description: 'Test', date: '2026-12-01', place: 'Tunis', price: 0, nbPlaces: 5 });
    expect(service.count()).toBe(before.length + 1);
    expect(before).toHaveLength(3);
    service.updatePlaces(created.id, 4);
    expect(service.getById(created.id)?.nbPlaces).toBe(4);
    expect(() => service.updatePlaces(created.id, -1)).toThrow();
    service.remove(created.id); expect(service.count()).toBe(3);
  });
});
