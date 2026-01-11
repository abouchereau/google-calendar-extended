import SqlBase from "./SqlBase.js";
import GoogleCal from "./GoogleCal.js"
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class SqlJob extends SqlBase {

    async getAllJobs(cal_id=null, asList=false) {
        let tab = await this._query(
            "select c.summary, j.id, j.label, j.icon, count(pj.id) as nb"+
            " from cal c"+
            " left join job j on c.cal_id = j.cal_id"+
            " left join person_job pj on pj.job_id = j.id"+
            " where (? is null or c.cal_id=?)"+
            " group by c.summary, j.id, j.label",
            [cal_id, cal_id]
            
        );
        tab = tab.filter(l=>!GoogleCal.EXCLUDE_CALS.includes(l.summary));
        if (asList) {
            return tab;
        }
        else {
            const calJob = {};
            for(let line of tab) {
                if (calJob[line['summary']] == null) {
                    calJob[line['summary']] = [];
                }
                if (line['label'] != null) {
                    calJob[line['summary']].push({"id":line['id'],"label":line['label'],'nb':line['nb'],'icon':line['icon']});
                }
        }
            return calJob;
        }
    }

    async addJob(cal_summary, job, icon) {
        const cals = await this._query("select cal_id from cal where summary=?", [cal_summary]);
        const cal = cals[0];
        await this._query("insert into job(label, cal_id, icon) values (?, ?, ?)", [job, cal.cal_id, icon]);
    }

    async deleteJob(id) {
        await this._query("delete from job where id=?", [id]);
    }


    async addPersonJob(person_id, job_id, is_holder) {
        await this._query("insert into person_job(person_id, job_id, is_holder) values (?,?,?)", [person_id, job_id, is_holder]);
    }

    async deletePersonJob(id) {
        await this._query("delete from person_job where id=?", [id]);
    }

    getAllIcons() {
        const iconFolder= __dirname+'/../public/images/instru/';
        return readdirSync(iconFolder);
    }

}