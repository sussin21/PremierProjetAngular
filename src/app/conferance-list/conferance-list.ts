import { Component, computed, inject, signal } from '@angular/core';
import { Conferance } from '../services/conferance';
import { Conference } from '../models/conference';
import { ConferenceCard } from '../conference-card/conference-card';
@Component({
  selector: 'app-conferance-list', imports: [ConferenceCard],
  templateUrl: './conferance-list.html', styleUrl: './conferance-list.css',
})
export class ConferanceList {
  private readonly service = inject(Conferance);
  readonly conferances = signal(this.service.getAll());
  readonly selected = signal<Conference | null>(null);
  readonly total = computed(() => this.conferances().length);
}
