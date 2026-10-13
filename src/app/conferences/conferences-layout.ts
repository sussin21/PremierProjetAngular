import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({ selector: 'app-conferences-layout', imports: [RouterOutlet], template: '<section aria-label="Gestion des conférences"><router-outlet /></section>' })
export class ConferencesLayout {}
