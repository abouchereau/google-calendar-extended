import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Cal } from '../../models/entity/cal';
import { Formule } from '../../models/entity/formule';
import { CalService } from '../../services/cal.service';
import { FormuleService } from '../../services/formule.service';
import { LoaderService } from '../../services/loader.service';
import { AdminFooter } from '../admin-footer/admin-footer';
import { ModalInfo } from '../modal-info/modal-info';

@Component({
  selector: 'app-admin-formulas',
  standalone: true,
  imports: [FormsModule, AdminFooter, ModalInfo],
  templateUrl: './admin-formulas.html',
  styleUrl: './admin-formulas.css',
})
export class AdminFormulas implements AfterViewInit {

  private readonly route = inject(ActivatedRoute);
  private readonly calService = inject(CalService);
  private readonly formuleService = inject(FormuleService);
  private readonly loader = inject(LoaderService);

  cals: Cal[] = [];
  curCal = '';
  formulas: Formule[] = [];
  newFormula = '';

  @ViewChild(ModalInfo)
  modalInfo!: ModalInfo;

  async ngAfterViewInit(): Promise<void> {
    this.cals = await firstValueFrom(this.calService.loadCals());
    this.curCal = this.cals[0]?.cal_id ?? '';
    if (this.curCal) {
      await this.loadFormulas();
    }
  }

  async loadFormulas(): Promise<void> {
    if (!this.curCal) {
      this.formulas = [];
      return;
    }

    this.loader.show();
    try {
      this.formulas = await firstValueFrom(this.formuleService.getFormules(this.curCal));
    } finally {
      this.loader.hide();
    }
  }

  async addFormula(): Promise<void> {
    if (!this.newFormula.trim() || !this.curCal) {
      return;
    }

    const name = this.newFormula.trim();
    this.loader.show();
    try {
      await firstValueFrom(this.formuleService.addFormule(name, this.curCal));
      await this.loadFormulas();
      this.modalInfo.open(`La formule ${name} a été ajoutée.`);
      this.newFormula = '';
    } finally {
      this.loader.hide();
    }
  }

  async editFormula(formula: Formule): Promise<void> {
    this.loader.show();
    try {
      await firstValueFrom(this.formuleService.updateFormule(formula.id, formula.formule, formula.loading_time, formula.slow_pct));
      await this.loadFormulas();
      this.modalInfo.open(`La formule ${formula.formule} a été modifiée.`);
    } finally {
      this.loader.hide();
    }
  }

  async deleteFormula(formula: Formule): Promise<void> {
    if (!confirm(`Supprimer la formule ${formula.formule} ?`)) {
      return;
    }

    const label = formula.formule;
    this.loader.show();
    try {
      await firstValueFrom(this.formuleService.deleteFormule(formula.id));
      await this.loadFormulas();
      this.modalInfo.open(`La formule ${label} a été supprimée.`);
    } finally {
      this.loader.hide();
    }
  }
}
