import SqlBase from "./SqlBase.js";
import GoogleCal from "./GoogleCal.js"


export default class SqlEvents extends SqlBase {

    async prepareSync(dateMin, dateMax) {
        return await this._query(
            "UPDATE event SET sync_google=0 WHERE date_start BETWEEN ? AND ?",[dateMin, dateMax] 
        );
    }

    async insertOrUpdateEvent(event) {
        await this._query("INSERT INTO event (event_id, cal_id, summary, description, date_start, date_end, data, sync_google) "+
                "VALUES (?,?,?,?,?,?,?,1) "+
                "ON DUPLICATE KEY UPDATE "+
                "summary = VALUES(summary), "+
                "description = VALUES(description), "+
                "date_start = VALUES(date_start), "+
                "data = VALUES(data), "+
                "sync_google = 1",
                event);
    }

    async getEventList(cal=null, year=null) {
        const params =  [cal, cal];
        let sql = "select e.id, e.event_id, c.id as cal_id, e.summary, DATE_FORMAT(e.date_start, \"%Y-%m-%d\") as date_start, DATE_FORMAT(e.date_end, \"%Y-%m-%d\") as date_end, e.data, e.sync_google, c.summary as cal_summary, c.color_front, c.color_back"+
            " from event e" +
            " left join cal c on c.cal_id = e.cal_id" +
            " where (? is null or c.id=?)";
        if (year=="-2") {
            sql += " and e.date_start > DATE_SUB(CURDATE(), INTERVAL 2 DAY)";
        }
        else if (year != null && year!="-1") {
            sql += " and year(e.date_start) = ?";
            params.push(year);
        }
        sql += " order by e.date_start, c.id";

        let list = await this._query(sql, params);
        list = list.filter(l=>!GoogleCal.EXCLUDE_CALS.includes(l.cal_summary));
        return list.map(x=>{
            let item = Object.assign({}, x, JSON.parse(x.data));
            delete item.data;
            return item;
        });
    }

    async getEvent(id) {
        let events = await this._query(
            "select e.id, e.event_id, e.cal_id, DATE_FORMAT(e.date_start, \"%d/%m/%Y\") as date_start, e.data, e.summary, COALESCE(e.description, '') as description,  e.sync_google, c.summary as cal_summary, c.color_front, c.color_back"+
            " from event e" +
            " left join cal c on c.cal_id = e.cal_id" +
            " where e.id=?",
            [id]
        );
        let event = Object.assign({}, events[0], JSON.parse(events[0].data));
        delete event.data;
        return event;        
    }

    async updateEventData(id, data) {
        return await this._query(
            "update event set data=? where id=?",
            [JSON.stringify(data), id]
        );
    }

    async getDatesSite() {
        return await this._query("select e.id, c.summary as groupe, e.date_start, e.cal_id, e.summary, e.description, e.date_start, e.data"+
                " from event e"+
                " left join cal c on c.cal_id = e.cal_id" +
                " where 1=1 "+
                //" AND JSON_EXTRACT(data , '$.afficherSite') = \"O\""+                 
                " AND sync_google=1"+
                " AND date_start > DATE_SUB(DATE(NOW()), INTERVAL 2 DAY)"+
                " AND (e.summary NOT LIKE '%]%' OR e.summary LIKE '[VALID%')"
            );
    }

    async updateCoord(id, coordArrivee) {
        const event = await this.getEvent(id);
        let data = event["data"];
        data = {...data, ...{"lat": coordArrivee[0], 'lon':coordArrivee[1]}};
        return await this.updateEventData(id, data);
    }
}