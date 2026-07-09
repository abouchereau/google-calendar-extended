import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../models/entity/event';
import { TeamMember } from '../../../../models/entity/team-member';
import { Person, PersonJob } from '../../../../models/entity/person';
import { Job } from '../../../../models/entity/job';
import { EquipeMultiselectComponent, SelectionOption } from './equipe-multiselect.component';
import { PersonService } from '../../../../services/person.service';
import { JobService } from '../../../../services/job.service';
import { Holder } from '../../../../models/enum/holder.enum';
import { parseEquipeMusiciens, serializeEquipeMusiciens } from '../../../../utils/equipe-musiciens.codec';
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
  @Output() changed = new EventEmitter<void>();

  private readonly personService = inject(PersonService);
  private readonly jobService = inject(JobService);
  private readonly cdr = inject(ChangeDetectorRef);

  jobs: JobDisplay[] = [];
  selectedMusiciens: Map<number, SelectionOption[]> = new Map();
  listMusiciens: Map<number, SelectionOption[]> = new Map();
  persons: Person[] = [];

  ngOnInit(): void {
    if (this.event) {
      void this.loadData();
    }
  }

  private async loadData(): Promise<void> {
    try {
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
      this.buildMusicienLists();
      this.fromEvent();
      this.cdr.detectChanges();
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
    this.markDirty();
  }

  onRemoveMusicien(musicien: SelectionOption, job: JobDisplay): void {
    const selected = this.selectedMusiciens.get(job.id) || [];
    const filtered = selected.filter((m) => m.name !== musicien.name);
    this.selectedMusiciens.set(job.id, filtered);
    this.toEvent();
    this.markDirty();
  }

  onAddTag(tag: string, job: JobDisplay): void {
    if (tag.trim()) {
      const selected = this.selectedMusiciens.get(job.id) || [];
      const newMusicien: SelectionOption = {
        id: 0,
        name: tag,
        is_holder: -1,
      };
      selected.push(newMusicien);
      this.selectedMusiciens.set(job.id, selected);
      this.toEvent();
      this.markDirty();
    }
  }

  private toEvent(): void {
    if (!this.event) return;

    const serialized = serializeEquipeMusiciens(
      Array.from(this.selectedMusiciens.entries()).reduce(
        (records, [jobId, musiciens]) => {
          musiciens.forEach((m) => {
            records.push({
              jobId,
              personId: m.id,
              name: m.name,
              isHolder: m.is_holder ?? 0,
            });
          });
          return records;
        },
        [] as { jobId: number; personId: number; name: string; isHolder: number }[]
      )
    );

    this.event.equipeMusiciens = serialized as unknown as TeamMember[];
  }

  private markDirty(): void {
    this.changed.emit();
  }

  private fromEvent(): void {
    if (!this.event || !this.event.equipeMusiciens) return;

    this.selectedMusiciens.forEach((_, jobId) => {
      this.selectedMusiciens.set(jobId, []);
    });

    const rawEquipe = this.event.equipeMusiciens as unknown;

    if (Array.isArray(rawEquipe)) {
      const firstJobId = this.jobs[0]?.id;
      if (firstJobId == null) {
        return;
      }

      const selected = this.selectedMusiciens.get(firstJobId) || [];
      rawEquipe.forEach((member) => {
        selected.push({
          id: 0,
          name: member.name,
          is_holder: this.mapEnumToIsHolder(member.is_holder),
        });
      });
      this.selectedMusiciens.set(firstJobId, selected);
      return;
    }

    if (typeof rawEquipe !== 'string' || rawEquipe.trim() === '') {
      return;
    }

    parseEquipeMusiciens(rawEquipe).forEach((member) => {
      const selected = this.selectedMusiciens.get(member.jobId);
      if (!selected) {
        return;
      }

      selected.push({
        id: member.personId,
        name: member.name,
        is_holder: member.isHolder,
      });
      this.selectedMusiciens.set(member.jobId, selected);
    });
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
