import { Event } from '../models/entity/event';
import { EventDto } from '../models/dto/event-dto';
import { Repas } from '../models/enum/repas.enum';
import { Vehicule } from '../models/enum/vehicule.enum';
import { EnvoiKitCom } from '../models/enum/envoi-kit-com.enum';
import { TeamMember } from '../models/entity/team-member';
import { SuiviDevisContrat } from '../models/enum/suivi-devis-contrat.enum';
import { EventUtils } from '../utils/event-utils';
import { Job } from '../models/entity/job';
import { Holder } from '../models/enum/holder.enum';
import { parseEquipeMusiciens } from '../utils/equipe-musiciens.codec';


export class EventMapper {

    static jobs: Job[] = [];

    static setJobs(jobs: Record<string, Job[]>) {
        EventMapper.jobs = [];
        Object.values(jobs).forEach(j => {
            EventMapper.jobs.push(...j);
        });
    }

    static toEvent(dto: EventDto): Event {

        let transports:number[] = [];
        if (dto.transports) {
            transports = JSON.parse(dto.transports!) as number[];
        }
        const event: Event = {
            ...dto,
            date_start: dto.date_start ? new Date(dto.date_start): null,
            date_end: dto.date_end ? new Date(dto.date_end): null,
            sync_google: Boolean(dto.sync_google),
            cal_summary: dto.cal_summary.replaceAll("DATES ", "").toLowerCase().replace(/\b\p{L}/gu, char => char.toUpperCase()),
            equipeMusiciens: [] as TeamMember[],
            repas: dto.repas as Repas,
            vehicule: dto.vehicule as Vehicule,
            envoiKitCom: dto.envoiKitCom as EnvoiKitCom,      
            suiviDevisContrat: dto.suiviDevisContrat as SuiviDevisContrat,
            isCrafter: transports.includes(1),
            isVehPerso: transports.includes(2),
            isLocation: transports.includes(3),
            isTrain: transports.includes(4)
        };

       parseEquipeMusiciens(dto.equipeMusiciens).forEach((member) => {
            const icon = EventMapper.jobs.find(j => j.id == member.jobId)?.icon || null;
            event.equipeMusiciens.push({
                name: EventUtils.nameAbrev(member.name),
                is_holder: Number(member.isHolder) as Holder,
                icon,
            });
       });

        return event;
    }

}
