import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Event } from '../../models/entity/event';
import { KeyValuePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SuiviDevisContrat, SuiviDevisContratLabels } from '../../models/enum/suivi-devis-contrat.enum';
import { Lov } from '../../core/lov';

@Component({
  selector: 'app-list',
  imports: [KeyValuePipe],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {

  private readonly route = inject(ActivatedRoute);

  isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  list: Record<string, Event[]> = {};
  displayFormule: Record<string, boolean> = {};

  ngOnInit(): void {
    this.updateScreenSize();
    window.addEventListener('resize', this.updateScreenSize.bind(this));    
    this.list = this.route.snapshot.data['data']['list'];
    this.displayFormule = this.route.snapshot.data['data']['displayFormule'];
  }

  updateScreenSize() {
    this.isMobile.next(window.innerWidth < 576);
  }

  statutClass(key: number | undefined, sync_google: boolean): string {
    if (sync_google == false) {
      key = 4;
    }
    if (key != undefined && key>=1 && key<=5) {
      return "statut"+key;
    }
    return "text-bg-light";
  }

    statutText(key: number | undefined): string {
      if (key != undefined && key>=1 && key<=5) {
        return SuiviDevisContratLabels[key as SuiviDevisContrat];
      }
      return "";
    }

    dayFullName(date_start: Date | null, date_end: Date | null): string {
      if (date_start &&date_end && date_end.getDate() != date_start.getDate()) {
          return '<div class="lh-sm" style="font-size:85%"><b>'+date_start.getDate()+'</b>-<b>'+date_end.getDate()+'</b></div>';          
      }
      else {
        return '<div class="lh-sm" style="font-size:85%">'+Lov.dayList[(date_start!.getDay()+6)%7].substring(0,3)+'</div><div class="lh-sm"><b>'+date_start!.getDate()+'</b></div>';        
     }
    }

}
