import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Conferance {
    conferences: any[] = [
    {
      id: 1,
      name: 'Angular Conference',
      date: '2026-10-15',
      place: 'Tunis'
    },
    {
      id: 2,
      name: 'Java Conference',
      date: '2026-10-20',
      place: 'Sousse'
    },
    {
      id: 3,
      name: 'AI Conference',
      date: '2026-10-25',
      place: 'Sfax'
    }
  ];

  getAll(): any[] {
    return this.conferences;
  }

  getById(id: number): any  {
    console.log('id', id);
    return this.conferences.find(conf => conf.id === id);
  }
}
