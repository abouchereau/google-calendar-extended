import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
}
