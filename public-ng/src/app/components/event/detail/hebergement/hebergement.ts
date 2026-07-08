import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-hebergement',
  imports: [CommonModule, FormsModule],
  templateUrl: './hebergement.html',
  styleUrl: './hebergement.css',
})
export class Hebergement {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
}
