import { Component, inject, OnInit, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../models/entity/event';
import { EventService } from '../../../services/event.service';
import { UserService } from '../../../services/user.service';
import { General } from './general/general';
import { Horaires } from './horaires/horaires';
import { Equipe } from './equipe/equipe';
import { Transport } from './transport/transport';
import { Trajet } from './trajet/trajet';
import { Hebergement } from './hebergement/hebergement';
import { Contacts } from './contacts/contacts';
import { Communication } from './communication/communication';
import { Precision } from './precision/precision';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-detail',
  imports: [
    CommonModule,
    FormsModule,
    General,
    Horaires,
    Equipe,
    Transport,
    Trajet,
    Hebergement,
    Contacts,
    Communication,
    Precision,
    Footer
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly eventService = inject(EventService);
  private readonly userService = inject(UserService);
  private readonly cdr = inject(ChangeDetectorRef);

  editable: boolean = false;
  isMobile: boolean = true;
  event: Event | null = null;
  hasChanges: boolean = false;
  refreshKey: number = 0;

  @ViewChild('eventHoraireMobile')
  eventHoraireMobile?: Horaires;

  ngOnInit(): void {
    this.updateScreenSize();
    window.addEventListener('resize', this.updateScreenSize.bind(this));

    // Get the mode from route data (view or edit)
    this.route.data.subscribe(({ data }) => {
      this.event = data.event;
      this.hasChanges = false;
      const mode = this.route.snapshot.data['mode'];
      
      // Vérifier les droits d'accès
      const currentUser = this.userService.currentUser();
      const hasWriteAccess = currentUser?.write;
      
      if (mode === 'edit' && !hasWriteAccess) {
        // Rediriger vers la page view si l'utilisateur n'a pas les droits en écriture
        const eventId = this.route.snapshot.paramMap.get('id');
        this.router.navigate(['/event/view', eventId]);
        return;
      }
      
      this.editable = mode === 'edit';
      this.refreshKey++;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateScreenSize.bind(this));
  }

  @HostListener('window:resize')
  updateScreenSize(): void {
    this.isMobile = window.innerWidth < 576;
  }

  onHeureDepartRecalculationRequested(): void {
    if (this.eventHoraireMobile) {
      this.eventHoraireMobile.openHeureDepartModal();
    }
  }

  markDirty(): void {
    this.hasChanges = true;
  }

  async updateEvent(): Promise<void> {
    if (!this.event) return;

    try {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) return;

      await this.eventService.updateEvent(id, this.event);
      this.hasChanges = false;
      // Optionally show a success message
      // this.showSpinner() / this.hideSpinner() equivalent
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }
}
