import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport.html',
  styleUrl: './transport.css',
})
export class Transport implements OnInit, OnChanges {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
  @Output() changed = new EventEmitter<void>();

  isCrafter = false;
  isVehPerso = false;
  isLocation = false;
  isTrain = false;

  ngOnInit(): void {
    this.syncFromEvent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event']) {
      this.syncFromEvent();
    }
  }

  onTransportChange(): void {
    this.syncToEvent();
    this.changed.emit();
  }

  onFieldChange(): void {
    this.changed.emit();
  }

  private syncFromEvent(): void {
    if (!this.event) {
      return;
    }

    const transports = this.parseTransports(this.event.transports);
    this.isCrafter = transports.includes(1);
    this.isVehPerso = transports.includes(2);
    this.isLocation = transports.includes(3);
    this.isTrain = transports.includes(4);
  }

  private syncToEvent(): void {
    if (!this.event) {
      return;
    }

    const transports: number[] = [];

    if (this.isCrafter) {
      transports.push(1);
    }
    if (this.isVehPerso) {
      transports.push(2);
    }
    if (this.isLocation) {
      transports.push(3);
    }
    if (this.isTrain) {
      transports.push(4);
    }

    this.event.transports = JSON.stringify(transports);
  }

  private parseTransports(raw: string | null | undefined): number[] {
    if (!raw || raw.trim() === '') {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.map((value) => Number(value)).filter((value) => !Number.isNaN(value)) : [];
    } catch {
      return [];
    }
  }
}
