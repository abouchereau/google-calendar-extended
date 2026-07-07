import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Job } from '../../models/entity/job';
import { Person } from '../../models/entity/person';
import { JobService } from '../../services/job.service';
import { PersonService } from '../../services/person.service';

export interface AdminPersonEditData {
  person: Person | null;
  jobs: Job[];
}

export const adminPersonEditResolver: ResolveFn<AdminPersonEditData> = async (route) => {
  const personService = inject(PersonService);
  const jobService = inject(JobService);
  const id = Number(route.paramMap.get('id'));

  const [persons, jobs] = await Promise.all([
    firstValueFrom(personService.getAllPersons()),
    firstValueFrom(jobService.getAllJobs(true)),
  ]);

  const person = persons.find(e => e.person_id === id) ?? null;

  return {
    person,
    jobs,
  };
};
