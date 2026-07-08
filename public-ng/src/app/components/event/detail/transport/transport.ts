import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-transport',
  imports: [CommonModule, FormsModule],
  templateUrl: './transport.html',
  styleUrl: './transport.css',
})
export class Transport {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
}
