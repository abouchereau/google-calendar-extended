import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';
import { LoaderService } from '../../../../services/loader.service';
import { RouteService } from '../../../../services/route.service';
import { Vehicule } from '../../../../models/enum/vehicule.enum';

@Component({
  selector: 'app-trajet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trajet.html',
  styleUrl: './trajet.css',
})
export class Trajet implements OnInit, OnChanges {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;
  @Output() targetHeurDepart = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  private readonly routeService = inject(RouteService);
  private readonly loader = inject(LoaderService);

  ngOnInit(): void {
    this.ensureDefaultDepartureAddress();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event']) {
      this.ensureDefaultDepartureAddress();
    }
  }

  async computeTrajet(): Promise<void> {
    if (!this.event) {
      return;
    }

    const depart = this.event.adresseDepart?.trim() || '';
    const arrivee = this.event.adresseArrivee?.trim() || '';

    if (!depart) {
      alert("Adresse de départ vide");
      return;
    }

    if (!arrivee) {
      alert("Adresse d'arrivée vide");
      return;
    }

    this.loader.show();
    try {
      const route = await this.routeService.calculateRoute({
        id: this.event.id,
        depart,
        arrivee,
        mode: this.event.vehicule === Vehicule.LOCATION ? 'drive' : 'light_truck',
      });

      this.event.distanceKm = route.distance;
      this.event.dureeMinutes = route.duree;
      this.targetHeurDepart.emit();
      this.changed.emit();
    } catch (error) {
      console.error('Error calculating route:', error);
      alert("Erreur lors du calcul du trajet.");
    } finally {
      this.loader.hide();
    }
  }

  goGoogleMaps(): void {
    if (!this.event?.adresseArrivee) {
      return;
    }

    const url = 'https://www.google.com/maps/search/?api=1&query=' + this.adresseQuery(this.event.adresseArrivee);
    window.open(url, '_blank');
  }

  goWaze(): void {
    if (!this.event?.adresseArrivee) {
      return;
    }

    const url = 'https://waze.com/ul?q=' + this.adresseQuery(this.event.adresseArrivee);
    window.open(url, '_blank');
  }

  onFieldChange(): void {
    this.changed.emit();
  }

  formatDuration(value: number | null | undefined): string {
    if (value == null || Number.isNaN(Number(value))) {
      return '';
    }

    const minutes = Math.max(0, Math.round(Number(value)));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${String(remainingMinutes).padStart(2, '0')}`;
  }

  private ensureDefaultDepartureAddress(): void {
    if (!this.event) {
      return;
    }

    if (!this.event.adresseDepart || this.event.adresseDepart.trim() === '') {
      this.event.adresseDepart = '37e Parallèle\nAllée Roger Lecotte\n37100 Tours';
    }
  }

  private adresseQuery(value: string): string {
    return encodeURIComponent(value);
  }
}
