import { Component, computed, inject, signal, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Conferance } from '../services/conferance';
import { Conference } from '../models/conference';
import { ConferenceCard } from '../conference-card/conference-card';
@Component({
  selector: 'app-conferance-list', imports: [ConferenceCard, FormsModule],
  templateUrl: './conferance-list.html', styleUrl: './conferance-list.css',
})
export class ConferanceList {
  readonly service = inject(Conferance);
  readonly conferances = this.service.conferences;
  readonly selected = signal<Conference | null>(null);
  readonly search = input('');
  private readonly router = inject(Router);
  readonly filtered = computed(() => this.conferances().filter(c => c.name.toLowerCase().includes(this.search().toLowerCase())));
  setSearch(search: string) { this.router.navigate([], { queryParams: { search: search || null }, queryParamsHandling: 'merge', replaceUrl: true }); }
  readonly total = computed(() => this.conferances().length);
}
