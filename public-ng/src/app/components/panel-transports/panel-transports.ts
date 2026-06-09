import { Component, input } from '@angular/core';
import { Event } from '../../models/entity/event';
import { Lov } from '../../core/lov'

@Component({
  selector: 'panel-transports',
  imports: [],
  templateUrl: './panel-transports.html',
  styleUrl: './panel-transports.css',
})
export class PanelTransports {

    item = input.required<Event>();

    dayCrafter(dateStr:string) {
        if (!dateStr) {
            return "N.C";
        }
        const dateDepart = this.item()!.date_start!;
        const date = new Date(dateStr);
        if (date.getDate() == dateDepart.getDate()) {
            return date.getHours()+"h"+("0"+date.getMinutes()).slice(-2)
        }
        else {
            return Lov.dayList[(date.getDay()+6)%7].substr(0,3)+" "+date.getDate()+" à "+date.getHours()+"h"+("0"+date.getMinutes()).slice(-2);
        }
    }

}
