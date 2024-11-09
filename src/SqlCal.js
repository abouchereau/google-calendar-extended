import SqlBase from "./SqlBase.js";


export default class SqlCal extends SqlBase {

    async createOrUpdateCal(cal) {
        await this._query(
            "insert into cal(cal_id, color_front, color_back, summary) values(?,?,?,?) ON DUPLICATE KEY UPDATE color_front=VALUES(color_front), color_back=VALUES(COLOR_BACK), summary=VALUES(summary)",
            [cal.id, cal.foregroundColor, cal.backgroundColor, cal.summary]
        );
    }

    async getCalList() {
        return await this._query("select id, cal_id, color_front, color_back, summary from cal");
    }

}