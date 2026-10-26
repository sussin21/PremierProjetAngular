import { Component } from '@angular/core';
import { ConferanceDetails } from '../conferance-details/conferance-details';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conferance } from '../services/conferance';

@Component({
  selector: 'app-conferance-list',
  imports: [ConferanceDetails, RouterLink, RouterOutlet],
  templateUrl: './conferance-list.html',
  styleUrl: './conferance-list.css',
})
export class ConferanceList {
   conferances: any[] = [];

  constructor(private conferenceService: Conferance) {
    this.conferances = this.conferenceService.getAll();
  }
}
