import { Component, computed, inject, signal } from '@angular/core';
import { Conferance } from '../services/conferance';
import { Conference } from '../models/conference';
import { ConferenceCard } from '../conference-card/conference-card';
@Component({
  selector: 'app-conferance-list', imports: [ConferenceCard],
  templateUrl: './conferance-list.html', styleUrl: './conferance-list.css',
})
export class ConferanceList {
  readonly service = inject(Conferance);
  readonly conferances = this.service.conferences;
  readonly selected = signal<Conference | null>(null);
  readonly total = computed(() => this.conferances().length);
}
