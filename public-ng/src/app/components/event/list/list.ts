import { Component, inject, OnInit, HostListener, ViewChild } from '@angular/core';
import { Event } from '../../../models/entity/event';
import { KeyValuePipe, KeyValue } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SuiviDevisContrat, SuiviDevisContratLabels } from '../../../models/enum/suivi-devis-contrat.enum';
import { Lov } from '../../../core/lov';
import { Holder } from '../../../models/enum/holder.enum';
import { PanelTransports } from '../panel-transports/panel-transports';
import { PanelFooter } from '../panel-footer/panel-footer';
import { ModalFiltres } from '../../modal/modal-filtres/modal-filtres';
import { ModalPwa } from '../../modal/modal-pwa/modal-pwa';
import { ExcelService } from '../../../services/excel.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list',
  imports: [KeyValuePipe, PanelTransports, PanelFooter, ModalFiltres, ModalPwa],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {

  excelService:ExcelService = inject(ExcelService);
  userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  isMobile: boolean = true;
  list: Record<string, Event[]> = {};
  allEvents: Event[] = [];
  displayFormule: Record<string, boolean> = {};
  Holder = Holder;

  @ViewChild(ModalFiltres)
  modalFiltres!: ModalFiltres;

  @ViewChild(ModalPwa)
  modalPwa!: ModalPwa;

  ngOnInit(): void {
    this.updateScreenSize();
    this.route.data.subscribe(({ data }) => {
      this.list = data.list;
      this.displayFormule = data.displayFormule;
      this.allEvents = data.allEvents;
    });
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

  calNameFromId(id: number, event:MouseEvent) {   
    const url = [this.userService.currentUser()?.write ? 'event/edit/':'event/view', id];
    if (event?.ctrlKey || event?.metaKey) {
      window.open(this.router.serializeUrl(this.router.createUrlTree(url)), '_blank');
      return;
    }
    this.router.navigate(url);         
  }

  reloadList() {
    this.router.navigateByUrl(this.router.url);
  }

  openModalFiltres() {
    this.modalFiltres.openModal();
  }

  openModalPwa() {
    this.modalPwa.openModal();
  }

  keepOrder(a: KeyValue<string, Event[]>, b: KeyValue<string, Event[]>) {//sinon la liste est triée sur les clés
    return 0;
  }

  exportExcel() {
      this.excelService.export(this.allEvents);
  }

}
