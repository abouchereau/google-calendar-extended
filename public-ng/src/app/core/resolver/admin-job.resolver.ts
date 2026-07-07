import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Job } from '../../models/entity/job';
import { JobService } from '../../services/job.service';

export interface AdminJobData {
  cals: Record<string, Job[]>;
  calList: string[];
  iconList: string[];
}

export const adminJobResolver: ResolveFn<AdminJobData> = async () => {
  const jobService = inject(JobService);

  const [cals, iconList] = await Promise.all([
    firstValueFrom(jobService.getAllJobs()),
    firstValueFrom(jobService.getAllIcons()),
  ]);

  const calList = Object.keys(cals);

  return {
    cals,
    calList,
    iconList,
  };
};
