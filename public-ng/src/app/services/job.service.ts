import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Job } from '../models/entity/job';
import { Config } from '../core/config';
@Injectable({
  providedIn: 'root',
})
export class JobService {
  
    private readonly http = inject(HttpClient);

    getAllJobs(asList=false, cal_id=null): Observable<Record<string, Job[]>> {
      const objParams: Record<string, string> = {};
      if (asList) {
        objParams["asList"] = "1";
      }
      if (cal_id) {
        objParams["cal_id"] = cal_id;
      }
      return this.http.get<Record<string, Job[]>>(Config.BASE_API + '/jobs?' + new URLSearchParams(objParams).toString());
    }
  
}
