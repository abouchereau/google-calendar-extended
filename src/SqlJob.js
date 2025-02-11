import SqlBase from "./SqlBase.js";


export default class SqlJob extends SqlBase {

    async getAllJobs(cal_id=null) {
        const tab = await this._query(
            "select c.summary, j.id, j.label, count(pj.id) as nb"+
            " from cal c"+
            " left join job j on c.cal_id = j.cal_id"+
            " left join person_job pj on pj.job_id = j.id"+
            " where (? is null or c.cal_id=?)"+
            " group by c.summary, j.id, j.label",
            [cal_id, cal_id]
            
        );
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