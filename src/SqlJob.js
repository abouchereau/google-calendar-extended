import SqlBase from "./SqlBase.js";


export default class SqlJob extends SqlBase {

    async getAllJobs(cal_id=null) {
        return await this._query(
            "select c.summary, j.id, j.label"+
            " from cal c"+
            " left join job j on c.cal_id = j.cal_id"+
            " where (? is null or c.cal_id=?)",
            [cal_id, cal_id]
            
        );
    }

}