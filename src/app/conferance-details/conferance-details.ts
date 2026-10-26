import { Component, input } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Conference } from '../models/conference';
@Component({ selector: 'app-conferance-details', imports: [RouterLink, DatePipe, CurrencyPipe],
 templateUrl: './conferance-details.html', styleUrl: './conferance-details.css' })
export class ConferanceDetails {
  readonly id = input.required<string>();
  readonly conference = input<Conference | null>(null, { alias: 'resolvedConference' });
}
