import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Config } from '../core/config';
import { HttpClient } from '@angular/common/http';
import { Cal } from '../models/entity/cal';

@Injectable({
  providedIn: 'root',
})
export class CalService {
  
  private readonly http = inject(HttpClient);

  loadCals(): Observable<Cal[]> {
    return this.http.get<Cal[]>(Config.BASE_API +"/getCalList");
  }

}
