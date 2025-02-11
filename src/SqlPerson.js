import SqlBase from "./SqlBase.js";


export default class SqlPerson extends SqlBase {

    async getAllPerson() {
        return await this._query(
            "SELECT "+
            " p.id AS person_id,"+
            " p.firstname,"+
            " p.lastname,"+
            " GROUP_CONCAT(CONCAT(j.label, ' (', c.summary, ')') ORDER BY j.label SEPARATOR ', ') AS jobs"+
            " FROM person p"+
            " LEFT JOIN person_job pj ON p.id = pj.person_id"+
            " LEFT JOIN job j ON pj.job_id = j.id"+
            " LEFT JOIN cal c ON j.cal_id = c.cal_id"+
            " GROUP BY p.id"+
            " ORDER BY p.lastname");
    }

}