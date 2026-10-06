import { Injectable, signal, computed } from '@angular/core';
import { Conference, ConferenceDraft } from '../models/conference';
@Injectable({ providedIn: 'root' })
export class Conferance {
  private readonly state = signal<Conference[]>([
    { id: 1, name: 'Angular Conference', description: 'Composants et Signals', date: '2026-11-05', place: 'Tunis', price: 20, nbPlaces: 120 },
    { id: 2, name: 'Java Conference', description: 'Services et applications', date: '2026-11-12', place: 'Sousse', price: 30, nbPlaces: 60 },
    { id: 3, name: 'AI Conference', description: 'Découvrir les modèles', date: '2026-11-20', place: 'Sfax', price: 0, nbPlaces: 0 }
  ]);
  readonly conferences = this.state.asReadonly();
  readonly count = computed(() => this.conferences().length);
  getAll(): Conference[] { return this.conferences(); }
  getById(id: number): Conference | undefined { return this.conferences().find(c => c.id === id); }
  create(draft: ConferenceDraft): Conference {
    const created = { ...draft, id: Math.max(0, ...this.conferences().map(c => c.id)) + 1 };
    this.state.update(items => [...items, created]);
    return created;
  }
  update(conference: Conference): void {
    this.state.update(items => items.map(c => c.id === conference.id ? { ...conference } : c));
  }
  updatePlaces(id: number, nbPlaces: number): void {
    if (!Number.isInteger(nbPlaces) || nbPlaces < 0) throw new Error('Nombre de places invalide');
    this.state.update(items => items.map(c => c.id === id ? { ...c, nbPlaces } : c));
  }
  remove(id: number): void { this.state.update(items => items.filter(c => c.id !== id)); }
}
