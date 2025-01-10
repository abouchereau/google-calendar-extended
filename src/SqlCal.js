import SqlBase from "./SqlBase.js";


export default class SqlCal extends SqlBase {

    async insertOrUpdateCal(cal) {
        await this._query(
            "insert into cal(cal_id, color_front, color_back, summary) values(?,?,?,?) ON DUPLICATE KEY UPDATE color_front=VALUES(color_front), color_back=VALUES(COLOR_BACK), summary=VALUES(summary)",
            [cal.id, cal.foregroundColor, cal.backgroundColor, cal.summary]
        );
    }

    async getCalList() {
        return await this._query("select id, cal_id, color_front, color_back, summary from cal");
    }

    async getFormules(cal_id) {
        return await this._query(
            "select ifnull(f.label, c.summary) as formule from cal c left join formule f on f.cal_id = c.cal_id where c.cal_id=?", [cal_id]
        );
    }

    async getPersons(cal_id) {
        return await this._query(
            "SELECT CONCAT(p.firstname, ' ', p.lastname) as fullname FROM person p LEFT JOIN person_cal pc on pc.person_id = p.id LEFT JOIN cal c ON c.cal_id = pc.cal_id WHERE c.cal_id=?",[cal_id]
        );
    }

}