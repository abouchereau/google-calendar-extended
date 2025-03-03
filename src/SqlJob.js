import SqlBase from "./SqlBase.js";


export default class SqlJob extends SqlBase {

    async getAllJobs(cal_id=null, asList=false) {
        const tab = await this._query(
            "select c.summary, j.id, j.label, count(pj.id) as nb"+
            " from cal c"+
            " left join job j on c.cal_id = j.cal_id"+
            " left join person_job pj on pj.job_id = j.id"+
            " where (? is null or c.cal_id=?)"+
            " group by c.summary, j.id, j.label",
            [cal_id, cal_id]
            
        );
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
                    calJob[line['summary']].push({"id":line['id'],"label":line['label'],'nb':line['nb']});
                }
            }
            return calJob;
        }
    }

    async addJob(cal_summary, job) {
        const cals = await this._query("select cal_id from cal where summary=?", [cal_summary]);
        console.log(cals);
        const cal = cals[0];
        await this._query("insert into job(label, cal_id) values (?, ?)", [job, cal.cal_id]);
    }

    async addPersonJob(person_id, job_id, is_holder) {
        await this._query("insert into person_job(person_id, job_id, is_holder) values (?,?,?)", [person_id, job_id, is_holder]);
    }

    async deletePersonJob(id) {
        await this._query("delete from person_job where id=?", [id]);
    }

}