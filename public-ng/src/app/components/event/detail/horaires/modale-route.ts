import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { firstValueFrom } from 'rxjs';
import { Event } from '../../../../models/entity/event';
import { Formule } from '../../../../models/entity/formule';
import { FormuleService } from '../../../../services/formule.service';

@Component({
  selector: 'app-modale-route',
  imports: [CommonModule],
  templateUrl: './modale-route.html',
  styleUrl: './modale-route.css',
})
export class ModaleRoute implements AfterViewInit {
  @Input() event: Event | null = null;
  @Output() acceptHeureDepart = new EventEmitter<string>();

  @ViewChild('modalRoute')
  modalElement!: ElementRef<HTMLDivElement>;

  private readonly formuleSvc = inject(FormuleService);
  private modal: Modal | null = null;

  formule: Formule | null = null;
  heureDepart = '';
  heureDepartSansArrondi = '';
  heureApresChargement = '';
  dureeTrajetMinutes = 0;
  totalTrajetMinutes = 0;
  isLoaded = false;

  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement);
  }

  async open(): Promise<void> {
    if (!this.event?.heureArrivee || !this.event.formule || !this.event.dureeMinutes) {
      return;
    }

    this.isLoaded = false;

    const formules = await firstValueFrom(this.formuleSvc.getAllFormules());
    this.formule =
      formules.find((f) => f.formule === this.event?.formule && String(f.cal_id) === String(this.event?.cal_id)) ??
      null;

    if (!this.formule) {
      return;
    }

    this.dureeTrajetMinutes = Math.max(0, Math.round(Number(this.event.dureeMinutes)));
    this.totalTrajetMinutes = Math.ceil(
      this.dureeTrajetMinutes * (1 + Number(this.formule.slow_pct) / 100)
    );

    this.computeHeureDepart();

    if (!this.heureDepart || this.heureDepart === this.event.heureDepart) {
      return;
    }

    this.heureApresChargement = this.heureDepartApresChargement();
    this.isLoaded = true;
    this.modal?.show();
  }

  accept(): void {
    this.modal?.hide();
    this.acceptHeureDepart.emit(this.heureDepart);
  }

  private computeHeureDepart(): void {
    if (!this.event?.heureArrivee || !this.formule) {
      return;
    }

    const [hours, minutes] = this.event.heureArrivee.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    totalMinutes = Math.round(totalMinutes - this.totalTrajetMinutes - this.formule.loading_time);

    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }

    this.heureDepartSansArrondi = this.minutesToClock(totalMinutes);
    totalMinutes = Math.floor(totalMinutes / 10) * 10;
    this.heureDepart = this.minutesToClock(totalMinutes);
  }

  private heureDepartApresChargement(): string {
    const totalMinutes = this.clockToMinutes(this.heureDepart) + this.formule!.loading_time;
    return this.minutesToClock(totalMinutes);
  }

  private minutesToClock(totalMinutes: number): string {
    const normalized = ((Math.round(totalMinutes) % (24 * 60)) + 24 * 60) % (24 * 60);
    const hours = Math.floor(normalized / 60);
    const minutes = normalized % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  private clockToMinutes(value: string): number {
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
