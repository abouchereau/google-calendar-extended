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
                "date_end = VALUES(date_end), "+
                "data = VALUES(data), "+
                "sync_google = 1",
                event);
    }

    async getEventList(cal=null, year=null) {
        const params =  [];
        let sql = "select e.id, e.event_id, c.id as cal_id, e.summary, DATE_FORMAT(e.date_start, \"%Y-%m-%d\") as date_start, DATE_FORMAT(SUBDATE(e.date_end, INTERVAL 1 HOUR), \"%Y-%m-%d\") as date_end, e.data, e.sync_google, c.summary as cal_summary, c.color_front, c.color_back"+
            " from event e" +
            " left join cal c on c.cal_id = e.cal_id" +
            " where 1=1";
        if (year=="-2") {
            sql += " and e.date_start > DATE_SUB(CURDATE(), INTERVAL 2 DAY)";
        }
        else if (year != null && year!="-1") {
            sql += " and year(e.date_start) = ?";
            params.push(year);
        }
        sql += " order by e.date_start, c.id";

        let list = await this._query(sql, params);
        list = this.#filterExlcudeCal(list);
        list = this.#mergeData(list);
        list = this.#addDateCrafter(list);
        list = this.#addCrafterOverlap(list);
        if (cal) {
            list = this.#filterCal(list, cal);
        }
        return list;
    }      

    async getEventListFull(cal=null, year=null) {
        const params =  [];
        let sql = "select e.id, e.event_id, c.id as cal_id, e.summary, DATE_FORMAT(e.date_start, \"%Y-%m-%d\") as date_start, DATE_FORMAT(SUBDATE(e.date_end, '1 HOUR'), \"%Y-%m-%d\") as date_end, e.data, e.sync_google, c.summary as cal_summary, c.color_front, c.color_back"+
            " from event e" +
            " left join cal c on c.cal_id = e.cal_id" +
            " where 1=1";
        if (year=="-2") {
            sql += " and e.date_start > DATE_SUB(CURDATE(), INTERVAL 2 DAY)";
        }
        else if (year != null && year!="-1") {
            sql += " and year(e.date_start) = ?";
            params.push(year);
        }
        sql += " order by e.date_start, c.id";

        let list = await this._query(sql, params);
        list = this.#filterExlcudeCal(list);
        list = this.#mergeData(list);
        list = this.#addDateCrafter(list);
        list = this.#addCrafterOverlap(list);
        if (cal) {
            list = this.#filterCal(list, cal);
        }
        return list;
    }    

    #filterExlcudeCal(list) {
        return list.filter(l=>GoogleCal.CALS_WHITE_LIST.includes(l.cal_summary));
    }

    #mergeData(list) {
        return list.map(x=>{
            let item = Object.assign({}, x, JSON.parse(x.data));
            delete item.data;            
            return item;
        });
    }

    #addDateCrafter(list) {
        return list.map(x=>{
            if (x.transports && x.transports.includes("1")) {
                x.dateDepartCrafterObj = x.dateDepartCrafter != null ? new Date(x.dateDepartCrafter) : new Date(x.date_start+"T00:00:00");
                x.dateRetourCrafterObj = x.dateRetourCrafter != null ? new Date(x.dateRetourCrafter) : new Date(x.date_end+"T23:59:00");
            }
            return x;
        });
    }

    #addCrafterOverlap(list) {
        return list.map(x=> {
            x.crafterOverlap = false;
            if (x.transports && x.transports.includes("1") && x.dateDepartCrafterObj && x.dateRetourCrafterObj) {
                if (list.some(y=>{
                    if (x.event_id != y.event_id && y.transports && y.transports.includes("1") && y.dateDepartCrafterObj && y.dateRetourCrafterObj) {
                        if (x.dateDepartCrafterObj <= y.dateRetourCrafterObj && y.dateDepartCrafterObj <= x.dateRetourCrafterObj) {
                        return true;
                        }
                    }
                    return false;  
                })) {
                    x.crafterOverlap = true;
                }
            }
            return x;
        });
    }

    #filterCal(list, cal) {
        return list.filter(l=>l.cal_id==cal);
    }

    async getEvent(id) {
        let events = await this._query(
            "select e.id, e.event_id, e.cal_id, DATE_FORMAT(e.date_start, \"%d/%m/%Y\") as date_start, e.data, e.summary, COALESCE(e.description, '') as description,  e.sync_google, c.summary as cal_summary, c.color_front, c.color_back"+
            " from event e" +
            " left join cal c on c.cal_id = e.cal_id" +
            " where e.id=?",
            [id]
        );
        let data = JSON.parse(events[0].data);
        if ("description" in data) {
            delete data["description"];
        }
        let event = Object.assign({}, events[0], data);
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
        return await this._query("select e.id, c.summary as groupe, e.date_start, e.cal_id, JSON_EXTRACT(data , '$.nomAfficherSite') as summary, e.description, e.date_start, e.data"+
                " from event e"+
                " left join cal c on c.cal_id = e.cal_id" +
                " where 1=1 "+
                " AND JSON_EXTRACT(data , '$.afficherSite') = \"O\""+                 
                " AND sync_google=1"+
                " AND date_start > DATE_SUB(DATE(NOW()), INTERVAL 2 DAY)"+
             //   "  AND (e.summary NOT LIKE '%]%' OR UPPER(e.summary) LIKE '[VALID%' OR UPPER(e.summary) LIKE '%[VALID%')"+
                " ORDER BY e.date_start"                
            );
    }

    async updateCoord(id, coordArrivee) {
        const event = await this.getEvent(id);
        let data = event["data"];
        data = {...data, ...{"lat": coordArrivee[0], 'lon':coordArrivee[1]}};
        return await this.updateEventData(id, data);
    }
}