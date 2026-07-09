import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';
import { EnvoiKitCom, EnvoiKitComLabels } from '../../../../models/enum/envoi-kit-com.enum';

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './communication.html',
  styleUrl: './communication.css',
})
export class Communication implements OnInit, OnChanges {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
  @Output() changed = new EventEmitter<void>();

  EnvoiKitCom = EnvoiKitCom;
  EnvoiKitComLabels = EnvoiKitComLabels;

  ngOnInit(): void {
    this.syncDefaults();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event']) {
      this.syncDefaults();
    }
  }

  onFieldChange(): void {
    this.changed.emit();
  }

  onAfficherSiteChange(): void {
    this.changed.emit();
  }

  private syncDefaults(): void {
    if (!this.event) {
      return;
    }

    if (!this.event.nomAfficherSite || this.event.nomAfficherSite.trim() === '') {
      this.event.nomAfficherSite = this.event.summary;
    }
  }
}
