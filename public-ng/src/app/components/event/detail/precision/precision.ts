import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-precision',
  imports: [CommonModule, FormsModule],
  templateUrl: './precision.html',
  styleUrl: './precision.css',
})
export class Precision {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
}
