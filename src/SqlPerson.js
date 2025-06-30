import SqlBase from "./SqlBase.js";


export default class SqlPerson extends SqlBase {

    async getAllPerson(cal_id=null) {
        const res = await this._query(
            "SELECT "+
            " p.id AS person_id,"+
            " p.firstname,"+
            " p.lastname,"+
            " CAST(CASE WHEN pj.id IS NOT NULL THEN JSON_ARRAYAGG(JSON_OBJECT('id', pj.id, 'job', j.label, 'group', c.summary, 'is_holder', pj.is_holder)) ELSE JSON_ARRAY() END AS CHAR) AS jobs"+
            " FROM person p"+
            " LEFT JOIN person_job pj ON p.id = pj.person_id"+
            " LEFT JOIN job j ON pj.job_id = j.id"+
            " LEFT JOIN cal c ON j.cal_id = c.cal_id"+
            " WHERE (? is null or c.cal_id=?)"+
            " GROUP BY p.id, p.firstname, p.lastname"+
            " ORDER BY p.firstname", 
            [cal_id, cal_id]);
        res.forEach((r,index)=>res[index]['jobs']=JSON.parse(r['jobs']));
        return res;
    }

    async addPerson(firstname, lastname) {
        await this._query("insert into person(firstname, lastname) values (?,?)", [firstname, lastname]);
    }

    async updatePerson(id, fisrtname, lastname) {
        return await this._query("UPDATE person SET firstname=?, lastname=? WHERE id=?",[fisrtname, lastname, id]);
    }

    async deletePerson(id) {
        return await this._query("delete from person where id=?", [id]);
    }

}