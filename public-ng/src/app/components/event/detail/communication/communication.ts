import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-communication',
  imports: [CommonModule, FormsModule],
  templateUrl: './communication.html',
  styleUrl: './communication.css',
})
export class Communication {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
}
