import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';
import { TeamMember } from '../../../../models/entity/team-member';
import { Person, PersonJob } from '../../../../models/entity/person';
import { Job } from '../../../../models/entity/job';
import { EquipeMultiselectComponent, SelectionOption } from './equipe-multiselect.component';
import { EventService } from '../../../../services/event.service';
import { PersonService } from '../../../../services/person.service';
import { JobService } from '../../../../services/job.service';
import { Holder } from '../../../../models/enum/holder.enum';
import { firstValueFrom } from 'rxjs';

interface JobDisplay {
  id: number;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule, FormsModule, EquipeMultiselectComponent],
  templateUrl: './equipe.html',
  styleUrl: './equipe.css',
})
export class Equipe implements OnInit {
  @Input() event: Event | null = null;
  @Input() editable: boolean = false;

  private readonly personService = inject(PersonService);
  private readonly jobService = inject(JobService);

  jobs: JobDisplay[] = [];
  selectedMusiciens: Map<number, SelectionOption[]> = new Map();
  listMusiciens: Map<number, SelectionOption[]> = new Map();
  persons: Person[] = [];

  ngOnInit(): void {
    if (this.event) {
      this.loadData();
    }
  }

  private async loadData(): Promise<void> {
    try {
      // Récupérer les jobs et personnes depuis l'API
      const jobsData = await firstValueFrom(
        this.jobService.getAllJobs(true, this.event?.cal_id?.toString() || null)
      );
      this.jobs = (jobsData as Job[]).map((job) => ({
        id: job.id,
        label: job.label,
        icon: job.icon || undefined,
      }));

      this.persons = await firstValueFrom(
        this.personService.getAllPersons(this.event?.cal_id?.toString() || null)
      );

      // Remplir les listes de musiciens par job
      this.buildMusicienLists();

      // Charger depuis l'objet event.equipeMusiciens
      this.fromEvent();
    } catch (error) {
      console.error('Error loading equipe data:', error);
    }
  }

  private buildMusicienLists(): void {
    this.jobs.forEach((job) => {
      this.selectedMusiciens.set(job.id, []);
      const musiciens: SelectionOption[] = [];

      this.persons.forEach((person) => {
        const personJobs = person.jobs || [];
        if (personJobs.some((pj: PersonJob) => pj.job === job.label)) {
          const jobPerson = personJobs.find((pj: PersonJob) => pj.job === job.label);
          if (jobPerson) {
            const option: SelectionOption = {
              id: person.person_id,
              name: `${person.firstname} ${person.lastname}`,
              is_holder: this.mapEnumToIsHolder(jobPerson.is_holder),
            };
            musiciens.push(option);
          }
        }
      });

      // Trier : holders d'abord, puis par nom
      musiciens.sort((a, b) => {
        const holderDiff = (b.is_holder || 0) - (a.is_holder || 0);
        if (holderDiff !== 0) return holderDiff;
        return a.name.localeCompare(b.name);
      });

      this.listMusiciens.set(job.id, musiciens);
    });
  }

  onSelectMusicien(musicien: SelectionOption, job: JobDisplay): void {
    const selected = this.selectedMusiciens.get(job.id) || [];
    if (!selected.some((m) => m.name === musicien.name)) {
      selected.push(musicien);
      this.selectedMusiciens.set(job.id, selected);
    }
    this.toEvent();
  }

  onRemoveMusicien(musicien: SelectionOption, job: JobDisplay): void {
    const selected = this.selectedMusiciens.get(job.id) || [];
    const filtered = selected.filter((m) => m.name !== musicien.name);
    this.selectedMusiciens.set(job.id, filtered);
    this.toEvent();
  }

  onAddTag(tag: string, job: JobDisplay): void {
    if (tag.trim()) {
      const selected = this.selectedMusiciens.get(job.id) || [];
      const newMusicien: SelectionOption = {
        id: 0, // Custom entry from user input
        name: tag,
        is_holder: -1, // -1 = custom/nouveau
      };
      selected.push(newMusicien);
      this.selectedMusiciens.set(job.id, selected);
      this.toEvent();
    }
  }

  private toEvent(): void {
    if (!this.event) return;

    const teamMembers: TeamMember[] = [];
    this.selectedMusiciens.forEach((musiciens) => {
      musiciens.forEach((m) => {
        const holder = this.mapIsHolderToEnum(m.is_holder || 0);
        teamMembers.push({
          name: m.name,
          is_holder: holder,
          icon: null,
        });
      });
    });

    this.event.equipeMusiciens = teamMembers;
  }

  private fromEvent(): void {
    if (!this.event || !this.event.equipeMusiciens) return;

    // Réinitialiser les sélections
    this.selectedMusiciens.forEach((_, jobId) => {
      this.selectedMusiciens.set(jobId, []);
    });

    // Pour l'instant, on assigne tous les team members au premier job
    // À adapter selon votre logique métier
    this.event.equipeMusiciens.forEach((member: TeamMember) => {
      const option: SelectionOption = {
        id: 0,
        name: member.name,
        is_holder: this.mapEnumToIsHolder(member.is_holder),
      };

      // Assigner au premier job par défaut (à adapter)
      if (this.jobs.length > 0) {
        const selected = this.selectedMusiciens.get(this.jobs[0].id) || [];
        selected.push(option);
        this.selectedMusiciens.set(this.jobs[0].id, selected);
      }
    });
  }

  private mapIsHolderToEnum(value: number): Holder {
    if (value === 1) return Holder.TITULAIRE;
    if (value === -1) return Holder.EXTERNE;
    return Holder.REMPLACANT;
  }

  private mapEnumToIsHolder(holder: Holder): number {
    switch (holder) {
      case Holder.TITULAIRE:
        return 1;
      case Holder.EXTERNE:
        return -1;
      case Holder.REMPLACANT:
      default:
        return 0;
    }
  }

  getSelectedMusiciens(jobId: number): SelectionOption[] {
    return this.selectedMusiciens.get(jobId) || [];
  }

  getJobMusicienOptions(jobId: number): SelectionOption[] {
    return this.listMusiciens.get(jobId) || [];
  }
}
