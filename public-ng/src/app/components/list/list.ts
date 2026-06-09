import { Component, inject, OnInit, HostListener } from '@angular/core';
import { Event } from '../../models/entity/event';
import { KeyValuePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SuiviDevisContrat, SuiviDevisContratLabels } from '../../models/enum/suivi-devis-contrat.enum';
import { Lov } from '../../core/lov';
import { Holder } from '../../models/enum/holder.enum';
import { PanelTransports } from '../panel-transports/panel-transports';
import { PanelFooter } from '../panel-footer/panel-footer';

@Component({
  selector: 'app-list',
  imports: [KeyValuePipe, PanelTransports, PanelFooter],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  isMobile: boolean = true;
  list: Record<string, Event[]> = {};
  displayFormule: Record<string, boolean> = {};
  Holder = Holder;

  ngOnInit(): void {
    this.updateScreenSize();
    this.list = this.route.snapshot.data['data']['list'];
    this.displayFormule = this.route.snapshot.data['data']['displayFormule'];
  }

  @HostListener('window:resize')
  updateScreenSize() {
    this.isMobile = window.innerWidth < 576;
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


  initials(name: string | null): string {
    if (!name) {
      return "";
    }
    const words = name.split(' ');
    if (words.length > 1) {
      return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    } else {
      return name.substring(0, 2).toUpperCase();
    }
  }

  calNameFromId(id: number, e:MouseEvent) {   
    alert("TODO");
    /* if (e.ctrlKey || e.metaKey) {
      let routeData = "#";
      if (this.$main.user.write) {
        routeData = this.$router.resolve({name:"event-edit", params: {id}});
      }
      else {
        routeData = this.$router.resolve({name:"event-view", params: {id}});
      }
      window.open(routeData.href, '_blank');
    }
    else {
      if (this.$main.user.write) {
        this.$router.push({name:"event-edit", params: {id}});
      }
      else {
        this.$router.push({name:"event-view", params: {id}});
      }
    }  */            
  }

  reloadList() {
    this.router.navigateByUrl(this.router.url);
  }

  openModalFiltres() {
    console.log("TODO");
  }

}
