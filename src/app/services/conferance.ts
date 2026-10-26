import { Injectable } from '@angular/core';
import { Conference } from '../models/conference';
@Injectable({ providedIn: 'root' })
export class Conferance {
  private conferences: Conference[] = [
    { id: 1, name: 'Angular Conference', description: 'Composants et Signals', date: '2026-11-05', place: 'Tunis', price: 20, nbPlaces: 120 },
    { id: 2, name: 'Java Conference', description: 'Services et applications', date: '2026-11-12', place: 'Sousse', price: 30, nbPlaces: 60 },
    { id: 3, name: 'AI Conference', description: 'Découvrir les modèles', date: '2026-11-20', place: 'Sfax', price: 0, nbPlaces: 0 }
  ];
  getAll(): Conference[] { return this.conferences; }
  getById(id: number): Conference | undefined { return this.conferences.find(c => c.id === id); }
}
