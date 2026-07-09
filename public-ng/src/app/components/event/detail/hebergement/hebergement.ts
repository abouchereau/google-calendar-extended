import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-hebergement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hebergement.html',
  styleUrl: './hebergement.css',
})
export class Hebergement implements OnInit, OnChanges {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
  @Output() changed = new EventEmitter<void>();

  dateArriveeHebergementValue = '';

  ngOnInit(): void {
    this.syncFromEvent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event']) {
      this.syncFromEvent();
    }
  }

  onFieldChange(): void {
    if (this.event) {
      this.event.dateArriveeHebergement = this.dateArriveeHebergementValue as unknown as Date;
    }
    this.changed.emit();
  }

  private syncFromEvent(): void {
    if (!this.event) {
      this.dateArriveeHebergementValue = '';
      return;
    }

    this.dateArriveeHebergementValue = this.toDatetimeLocalValue(this.event.dateArriveeHebergement);
  }

  private toDatetimeLocalValue(value: Date | string | null | undefined): string {
    if (!value) {
      return '';
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const pad = (n: number): string => String(n).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
