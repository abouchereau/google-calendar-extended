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
  @Output() updateEvent = new EventEmitter<void>();

  hasChanges: boolean = false;

  ngOnInit(): void {
    document.addEventListener('input', (event) => {
      if ((event.target as HTMLElement)?.matches('input, textarea, select')) {
        this.hasChanges = true;
      }
    });

    document.addEventListener('change', (event) => {
      if ((event.target as HTMLElement)?.matches('input, textarea, select')) {
        this.hasChanges = true;
      }
    });
  }

  onUpdateEvent(): void {
    if (this.hasChanges) {
      this.updateEvent.emit();
      this.hasChanges = false;
    }
  }

  logout(): void {
    // This will be handled by auth service
    // For now, just navigate to login
    window.location.href = '/login';
  }
}

