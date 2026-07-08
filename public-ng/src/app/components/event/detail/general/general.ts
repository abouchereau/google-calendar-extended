import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';
import { SuiviDevisContratLabels } from '../../../../models/enum/suivi-devis-contrat.enum';

@Component({
  selector: 'app-general',
  imports: [CommonModule, FormsModule],
  templateUrl: './general.html',
  styleUrl: './general.css',
})
export class General implements OnInit {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
  @Output() targetHeurDepart = new EventEmitter<void>();

  formules: string[] = [];
  refreshFormule: number = 0;
  suiviDevisContratLabels = SuiviDevisContratLabels;

  ngOnInit(): void {
    // TODO: Load formules from service
    // this.loadFormules();
  }

  onFormuleChange(): void {
    this.targetHeurDepart.emit();
  }

  // TODO: Implement method to load formules
  // private loadFormules() {
  //   if (this.event?.cal_id) {
  //     // Call service to get formules
  //   }
  // }
}

