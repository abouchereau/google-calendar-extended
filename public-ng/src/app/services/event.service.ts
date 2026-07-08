import { inject, Injectable } from '@angular/core';
import { EventDto } from '../models/dto/event-dto';
import { Observable, firstValueFrom } from 'rxjs';
import { Config } from '../core/config';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../models/entity/filter';
import { Event } from '../models/entity/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  
  private readonly http = inject(HttpClient);

  loadAllEvents(filter: Filter): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(Config.BASE_API + "/getEventList?" + filter.getUrlParams());
  }

  async getEvent(id: number | string): Promise<Event> {
    const event = await firstValueFrom(
      this.http.get<Event>(Config.BASE_API + "/getEvent/" + id)
    );
    // Parse date fields if needed
    if (event.date_start) {
      event.date_start = new Date(event.date_start);
    }
    if (event.date_end) {
      event.date_end = new Date(event.date_end);
    }
    if (event.dateEnvoi) {
      event.dateEnvoi = new Date(event.dateEnvoi);
    }
    return event;
  }

  async updateEvent(id: number | string, event: Event): Promise<Event> {
    return firstValueFrom(
      this.http.put<Event>(Config.BASE_API + "/updateEvent/" + id, event)
    );
  }

}
