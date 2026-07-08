import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Holder } from '../../../models/enum/holder.enum';
import { Job } from '../../../models/entity/job';
import { Person, PersonJob } from '../../../models/entity/person';
import { JobService } from '../../../services/job.service';
import { LoaderService } from '../../../services/loader.service';
import { PersonService } from '../../../services/person.service';
import { AdminPersonEditData } from '../../../core/resolver/admin-person-edit.resolver';
import { AdminFooter } from '../admin-footer/admin-footer';

@Component({
  selector: 'app-admin-person-edit',
  imports: [FormsModule, AdminFooter],
  templateUrl: './admin-person-edit.html',
  styleUrl: './admin-person-edit.css',
})
export class AdminPersonEdit implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly personService = inject(PersonService);
  private readonly jobService = inject(JobService);
  private readonly loader = inject(LoaderService);

  Holder = Holder;
  person: Person | null = null;
  personJobs: PersonJob[] = [];
  jobs: Job[] = [];
  newJob: number = -1;
  isHolder: string = String(Holder.TITULAIRE);

  ngOnInit(): void {
    this.route.data.subscribe(({ data }) => {
      this.applyData(data as AdminPersonEditData);
    });
  }

  private applyData(data: AdminPersonEditData): void {
    this.person = data.person;
    this.personJobs = data.person?.jobs ?? [];
    this.jobs = data.jobs;
    this.syncSelectedJob();

    if (!this.person) {
      void this.router.navigate(['/admin/person/list']);
    }
  }

  private syncSelectedJob(): void {
    if (this.jobs.length === 0) {
      this.newJob = -1;
      return;
    }

    if (!this.jobs.some(job => job.id === this.newJob)) {
      this.newJob = this.jobs[0].id;
    }
  }

  private async reloadPerson(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const [persons, jobs] = await Promise.all([
      firstValueFrom(this.personService.getAllPersons()),
      firstValueFrom(this.jobService.getAllJobs(true)),
    ]);

    this.person = persons.find(e => e.person_id === id) ?? null;
    this.personJobs = this.person?.jobs ?? [];
    this.jobs = jobs;
    this.syncSelectedJob();

    if (!this.person) {
      await this.router.navigate(['/admin/person/list']);
    }
  }

  private async refreshPage(): Promise<void> {
    await this.router.navigate([], {
      relativeTo: this.route
    });
  }

  async updatePerson(): Promise<void> {
    if (!this.person) {
      return;
    }

    this.loader.show();
    try {
      await firstValueFrom(this.personService.updatePerson(this.person.person_id, this.person.firstname, this.person.lastname));
      await this.refreshPage();
    } finally {
      this.loader.hide();
    }
  }

  async addJob(): Promise<void> {
    if (!this.person || this.newJob === -1) {
      return;
    }

    this.loader.show();
    try {
      await firstValueFrom(this.personService.addJobPerson(this.person.person_id, this.newJob, Number(this.isHolder)));
      await this.refreshPage();
    } finally {
      this.loader.hide();
    }
  }

  async deleteJob(id: number): Promise<void> {
    this.loader.show();
    try {
      await firstValueFrom(this.personService.deleteJobPerson(id));
      await this.refreshPage();
    } finally {
      this.loader.hide();
    }
  }

  goBack(): void {
    void this.router.navigate(['/admin/person/list']);
  }
}
