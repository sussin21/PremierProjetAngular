import { Component, DestroyRef, computed, inject, signal, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Conferance } from '../services/conferance';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Conference } from '../models/conference';
import { ConferenceCard } from '../conference-card/conference-card';
@Component({
  selector: 'app-conferance-list', imports: [ConferenceCard, FormsModule, RouterLink],
  templateUrl: './conferance-list.html', styleUrl: './conferance-list.css',
})
export class ConferanceList {
  readonly service = inject(Conferance);
  readonly conferances = this.service.conferences;
  readonly selected = signal<Conference | null>(null);
  private readonly destroyRef = inject(DestroyRef);
  ngOnInit() { this.service.load(); }
  remove(id: number) { this.service.remove(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ error: () => {} }); }
  reserve(conf: Conference) {
    if (conf.nbPlaces < 1) return;
    this.service.updatePlaces(conf.id, conf.nbPlaces - 1).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ error: () => {} });
  }
  readonly search = input('', { transform: (value: string | undefined) => value ?? '' });
  private readonly router = inject(Router);
  readonly filtered = computed(() => this.conferances().filter(c => c.name.toLowerCase().includes(this.search().toLowerCase())));
  setSearch(search: string) { this.router.navigate([], { queryParams: { search: search || null }, queryParamsHandling: 'merge', replaceUrl: true }); }
  readonly total = computed(() => this.conferances().length);
}
