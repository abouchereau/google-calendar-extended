import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-horaires',
  imports: [CommonModule, FormsModule],
  templateUrl: './horaires.html',
  styleUrl: './horaires.css',
})
export class Horaires {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
  @Input() isMobile: boolean = false;
  @Output() targetHeurDepart = new EventEmitter<void>();

  refreshKey: number = 0;

  computeHeureDepart(): void {
    if (this.event?.heureArrivee && this.event?.formule) {
      this.targetHeurDepart.emit();
    }
  }

  onHeureArrivalChange(): void {
    this.targetHeurDepart.emit();
  }
}
