import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Conference } from '../models/conference';
@Component({
  selector: 'app-conference-card',
  imports: [CurrencyPipe, DatePipe, NgClass, NgStyle, UpperCasePipe, RouterLink],
  template: `
    <article class="conference-card" [ngClass]="{ full: conference().nbPlaces === 0 }">
      <h2>{{ conference().name | uppercase }}</h2>
      <p>{{ conference().description }}</p>
      <p>{{ conference().date | date:'longDate' }} · {{ conference().place }}</p>
      <p>{{ conference().price | currency:'TND':'code' }}</p>
      <p [ngStyle]="{ color: conference().nbPlaces === 0 ? '#a22' : '#17623a' }">
        {{ conference().nbPlaces }} places disponibles
      </p>
      @switch (conference().nbPlaces) {
        @case (0) { <strong>Complet</strong> }
        @default { <span>Inscriptions ouvertes</span> }
      }
      <div class="actions">
        <a [routerLink]="['/details', conference().id]">Détails</a>
        <button type="button" (click)="selected.emit(conference())">Sélectionner</button>
      </div>
    </article>
  `,
})
export class ConferenceCard {
  readonly conference = input.required<Conference>();
  readonly selected = output<Conference>();
}
