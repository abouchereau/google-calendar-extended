import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Config } from '../core/config';

export interface RouteResult {
  distance: number;
  duree: number;
}

export interface RouteRequest {
  id: number;
  depart: string;
  arrivee: string;
  mode: 'drive' | 'light_truck';
}

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private readonly http = inject(HttpClient);

  calculateRoute(request: RouteRequest): Promise<RouteResult> {
    return firstValueFrom(
      this.http.post<RouteResult>(Config.BASE_API + '/calculateRoute', request)
    );
  }
}
