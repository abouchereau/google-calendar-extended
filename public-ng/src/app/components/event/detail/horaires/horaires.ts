import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';
import { ModaleRoute } from './modale-route';

@Component({
  selector: 'app-horaires',
  imports: [CommonModule, FormsModule, ModaleRoute],
  templateUrl: './horaires.html',
  styleUrl: './horaires.css',
})
export class Horaires {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
  @Output() changed = new EventEmitter<void>();

  @ViewChild('modalRoute')
  private modalRoute?: ModaleRoute;

  openHeureDepartModal(): void {
    if (this.event?.heureArrivee && this.event?.formule && this.event?.dureeMinutes) {
      void this.modalRoute?.open();
    }
  }

  onAcceptHeureDepart(heureDepart: string): void {
    if (!this.event) {
      return;
    }

    this.event.heureDepart = heureDepart;
    this.changed.emit();
  }
}
