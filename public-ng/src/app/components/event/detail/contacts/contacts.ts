import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
  @Output() changed = new EventEmitter<void>();

  onFieldChange(): void {
    this.changed.emit();
  }

  linkifyPhoneNumbers(text: string | null | undefined): string {
    if (!text) {
      return '';
    }

    const regex = /\b(?:0\d(?:[ .-]?\d{2}){4})\b/g;
    return this.nl2br(
      text.replace(regex, (match) => {
        const cleaned = match.replace(/[ .-]/g, '');
        return `<a class="btn btn-info" href="tel:${cleaned}"><i class="fa-solid fa-phone"></i> ${match}</a>`;
      })
    );
  }

  private nl2br(str: string, isXhtml?: boolean): string {
    const breakTag = isXhtml || typeof isXhtml === 'undefined' ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }
}
