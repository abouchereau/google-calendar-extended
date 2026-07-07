import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Event } from '../../models/entity/event';
import { EventService } from '../../services/event.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { FormuleService } from '../../services/formule.service';
import { JobService } from '../../services/job.service';
import { Formule } from '../../models/entity/formule';
import { Job } from '../../models/entity/job';
import { EventMapper } from '../../mappers/event.mapper';
import { FilterService } from '../../services/filter.service';
import { SuiviDevisContrat } from '../../models/enum/suivi-devis-contrat.enum';
import { Lov } from '../lov';

export const listResolver: ResolveFn<any> = async (route, state) => {

    const eventService = inject(EventService);
    const formuleService = inject(FormuleService);
    const jobService = inject(JobService);
    const filter = inject(FilterService).filter;

    const formules: Formule[] = await firstValueFrom(formuleService.getAllFormules());
    const counts = formules.reduce<Record<string, number>>((acc, { cal_id }) => {
            acc[cal_id] = (acc[cal_id] ?? 0) + 1;
            return acc;
        }, {});
    const displayFormule = Object.fromEntries(
        Object.entries(counts).map(([cal_id, count]) => [cal_id, count > 1])
    );

    const allJobs: Record<string, Job[]> = await firstValueFrom(jobService.getAllJobs());      
    EventMapper.setJobs(allJobs);
    let allEvents: Event[] = (await firstValueFrom(eventService.loadAllEvents(filter)))
        .map(e=>EventMapper.toEvent(e));
    if (!filter.displayDeleted) {
        allEvents = allEvents.filter(a=>a.sync_google && a.suiviDevisContrat!=SuiviDevisContrat.ANNULE_SUPPRIME);
    }      

    allEvents.sort((a, b) => a.date_start!.getTime() - b.date_start!.getTime());

    const list: Map<string, Event[]> = new Map<string, Event[]>; 
    allEvents.forEach((item,i)=>{
        const month = Lov.monthList[item.date_start!.getMonth()]+" "+item.date_start!.getFullYear();
        if (!list.has(month)) {
            list.set(month, []);
        }
        list.get(month)!.push(item);
    });     
    return {
        list, 
        displayFormule,
        allEvents
    };
}

