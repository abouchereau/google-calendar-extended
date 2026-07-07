import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/entity/job';
import { Config } from '../core/config';
@Injectable({
  providedIn: 'root',
})
export class JobService {
  
    private readonly http = inject(HttpClient);

    getAllJobs(asList?: false, cal_id?: string | null): Observable<Record<string, Job[]>>;
    getAllJobs(asList: true, cal_id?: string | null): Observable<Job[]>;
    getAllJobs(asList = false, cal_id: string | null = null): Observable<Record<string, Job[]> | Job[]> {
      const objParams: Record<string, string> = {};
      if (asList) {
        objParams["asList"] = "1";
      }
      if (cal_id) {
        objParams["cal_id"] = cal_id;
      }
      return this.http.get<Record<string, Job[]> | Job[]>(Config.BASE_API + '/jobs?' + new URLSearchParams(objParams).toString());
    }

    getAllIcons(): Observable<string[]> {
      return this.http.get<string[]>(Config.BASE_API + '/job/icons');
    }

    addJob(cal: string, job: string, icon: string | null): Observable<string> {
      const data = { cal, job, icon };
      return this.http.put(Config.BASE_API + '/job/add', data, { responseType: 'text' });
    }

    deleteJob(id: number): Observable<string> {
      return this.http.delete(Config.BASE_API + '/job/delete/' + id, { responseType: 'text' });
    }
  
}
