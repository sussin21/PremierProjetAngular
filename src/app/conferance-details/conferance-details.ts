import { Component, computed, inject, input } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Conferance } from '../services/conferance';
@Component({ selector: 'app-conferance-details', imports: [RouterLink, DatePipe, CurrencyPipe],
 templateUrl: './conferance-details.html', styleUrl: './conferance-details.css' })
export class ConferanceDetails {
  private readonly service = inject(Conferance);
  readonly id = input.required<string>();
  readonly conference = computed(() => this.service.getById(Number(this.id())));
}
