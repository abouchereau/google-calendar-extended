import SqlBase from "./SqlBase.js";
import GoogleCal from "./GoogleCal.js"

export default class SqlCal extends SqlBase {

    async insertOrUpdateCal(cal) {
        await this._query(
            "insert into cal(cal_id, color_front, color_back, summary) values(?,?,?,?) ON DUPLICATE KEY UPDATE color_front=VALUES(color_front), color_back=VALUES(COLOR_BACK), summary=VALUES(summary)",
            [cal.id, cal.foregroundColor, cal.backgroundColor, cal.summary]
        );
    }

    async getCalList() {
        const cals = await this._query("select id, cal_id, color_front, color_back, summary from cal");
        console.log("CALS", cals.length, cals.filter(c=>GoogleCal.CALS_WHITE_LIST.includes(c.cal_id)).length);
        return cals.filter(c=>GoogleCal.CALS_WHITE_LIST.includes(c.cal_id))
    }

    async getFormules(cal_id=null) {
        return await this._query(
            "select f.id, ifnull(f.label, c.summary) as formule, f.loading_time, f.slow_pct, f.cal_id from cal c left join formule f on f.cal_id = c.cal_id where (? is null or c.cal_id=?)", [cal_id, cal_id]
        );
    }

    async addFormule(name, cal_id) {
        await this._query("insert into formule(label, cal_id) values (?,?)", [name, cal_id]);
    }

    async updateFormule(id, name, loading_time, slow_pct) {
        return await this._query("UPDATE formule SET label=?, loading_time=?, slow_pct=? WHERE id=?",[name, loading_time, slow_pct, id]);
    }

    async deleteFormule(id) {
        return await this._query("delete from formule where id=?", [id]);
    }

    async getPersons(cal_id) {
        return await this._query(
            "SELECT CONCAT(p.firstname, ' ', p.lastname) as fullname FROM person p LEFT JOIN person_cal pc on pc.person_id = p.id LEFT JOIN cal c ON c.cal_id = pc.cal_id WHERE c.cal_id=?",[cal_id]
        );
    }

}