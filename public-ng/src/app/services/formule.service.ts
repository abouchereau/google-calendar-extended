import { inject, Injectable } from '@angular/core';
import { Formule } from '../models/entity/formule';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../core/config';

@Injectable({
  providedIn: 'root',
})
export class FormuleService {

  private readonly http = inject(HttpClient);

  getAllFormules(): Observable<Formule[]> {
    return this.http.get<Formule[]>(Config.BASE_API + '/getAllFormules');
  }

  getFormules(cal_id: string): Observable<Formule[]> {
    return this.http.get<Formule[]>(Config.BASE_API + '/getFormules/' + cal_id);
  }

  addFormule(name: string, cal_id: string): Observable<string> {
    const data = { name, cal_id };
    return this.http.put(Config.BASE_API + '/formule/add', data, { responseType: 'text' });
  }

  updateFormule(id: number, name: string, loading_time: number, slow_pct: number): Observable<string> {
    const data = { id, name, loading_time, slow_pct };
    return this.http.post(Config.BASE_API + '/formule/update', data, { responseType: 'text' });
  }

  deleteFormule(id: number): Observable<string> {
    return this.http.delete(Config.BASE_API + '/formule/delete/' + id, { responseType: 'text' });
  }


}
