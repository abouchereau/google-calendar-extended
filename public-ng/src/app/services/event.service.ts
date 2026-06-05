import { inject, Injectable } from '@angular/core';
import { EventDto } from '../models/dto/event-dto';
import { Observable } from 'rxjs/internal/Observable';
import { Config } from '../core/config';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../models/entity/filter';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  
  private readonly http = inject(HttpClient);



/*

    async getEvent(id) {
        let res = await fetch(Const.BASE_API+"/getEvent/"+id, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer "+this.user.getToken(),
                'Content-Type': 'application/json'
            }
        });
        let event = await res.json();
       // event.date_start = new Date(event.date_start);
        event = { ...Const.OBJ_EMPTY, ...event };
        return event;
    }
*/

  loadAllEvents(filter: Filter): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(Config.BASE_API +"/getEventList?"+filter.getUrlParams());
  }



}
