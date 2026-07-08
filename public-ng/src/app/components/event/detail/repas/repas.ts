import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-repas',
  imports: [CommonModule, FormsModule],
  templateUrl: './repas.html',
  styleUrl: './repas.css',
})
export class Repas {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
}
