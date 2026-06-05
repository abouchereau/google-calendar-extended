import { inject, Injectable } from '@angular/core';
import { Formule } from '../models/entity/formule';
import { Observable } from 'rxjs/internal/Observable';
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


}
