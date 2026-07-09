import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
  @Input() hasChanges: boolean = false;
  @Output() updateEvent = new EventEmitter<void>();

  onUpdateEvent(): void {
    if (this.hasChanges) {
      this.updateEvent.emit();
    }
  }

  logout(): void {
    // This will be handled by auth service
    // For now, just navigate to login
    window.location.href = '/login';
  }
}
