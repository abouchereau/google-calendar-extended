import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-trajet',
  imports: [CommonModule, FormsModule],
  templateUrl: './trajet.html',
  styleUrl: './trajet.css',
})
export class Trajet {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
  @Output() targetHeurDepart = new EventEmitter<void>();
}
