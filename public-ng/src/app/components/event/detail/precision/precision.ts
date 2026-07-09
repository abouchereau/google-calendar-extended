import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-precision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './precision.html',
  styleUrl: './precision.css',
})
export class Precision {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;

  nl2br(text: string | null | undefined): string {
    if (!text) {
      return '';
    }

    return text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
  }
}
