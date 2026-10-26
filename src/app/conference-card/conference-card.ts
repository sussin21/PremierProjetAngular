import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Conference } from '../models/conference';
@Component({
  selector: 'app-conference-card',
  imports: [CurrencyPipe, DatePipe, NgClass, NgStyle, RouterLink],
  styleUrl: './conference-card.css',
  template: `
    <div class="card" [ngClass]="{ full: conference().nbPlaces === 0 }">
      <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87" alt="Conference" />
      <div class="card-content">
        <h2>{{ conference().name }}</h2>
        <p>📅 {{ conference().date | date:'yyyy-MM-dd' }}</p>
        <p>📍 {{ conference().place }}</p>
        <details>
          <summary>Plus d'informations</summary>
          <p>{{ conference().description }}</p>
          <p>{{ conference().price | currency:'TND':'code' }}</p>
          <p [ngStyle]="{ color: conference().nbPlaces === 0 ? '#a22' : '#17623a' }">{{ conference().nbPlaces }} places disponibles</p>
          @switch (conference().nbPlaces) {
            @case (0) { <strong>Complet</strong> }
            @default { <span>Inscriptions ouvertes</span> }
          }
          <button type="button" (click)="selected.emit(conference())">Sélectionner</button>
          <button type="button" (click)="reserved.emit(conference())" [disabled]="busy() || conference().nbPlaces === 0">Réserver une place</button>
        </details>
      </div>
      <button type="button" [routerLink]="['/details', conference().id]">Details</button>
      <div class="card-actions">
        <a [routerLink]="['/conferences/edit', conference().id]">Modifier</a>
        <button type="button" (click)="removed.emit(conference().id)" [disabled]="busy()">Supprimer</button>
      </div>
    </div>
  `,
})
export class ConferenceCard {
  readonly conference = input.required<Conference>();
  readonly busy = input(false);
  readonly selected = output<Conference>();
  readonly removed = output<number>();
  readonly reserved = output<Conference>();
}
