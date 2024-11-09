import SqlBase from "./SqlBase.js";


export default class SqlEvents extends SqlBase {

    async insertOrUpdateEvent(event) {
        await this._query("INSERT INTO event (event_id, cal_id, summary, date_start, data) "+
                "VALUES (?,?,?,?,?) "+
                "ON DUPLICATE KEY UPDATE "+
                "summary = VALUES(summary), "+
                "date_start = VALUES(date_start), "+
                "data = VALUES(data)", 
                event);
    }

    async getEventList(cal=null, year=null, month=null) {
        let list = await this._query(
            "select e.id, e.event_id, c.id as cal_id, e.summary, DATE_FORMAT(e.date_start, \"%Y-%m-%d\") as date_start, e.data, c.summary as cal_summary, c.color_front, c.color_back"+
            " from event e" +
            " left join cal c on c.cal_id = e.cal_id" +
            " where (? is null or c.id=?)"+
            " and (? is null or month(e.date_start) = ?)"+
            " and (? is null or year(e.date_start) = ?)" +
            " order by e.date_start, c.id",
            [cal, cal, month, month, year, year]
        );
        return list.map(x=>{
            let item = Object.assign({}, x, JSON.parse(x.data));
            delete item.data;
            return item;
        });
    }

    async getEvent(eventId) {
        let events = await this._query(
            "select e.id, e.event_id, e.cal_id, DATE_FORMAT(e.date_start, \"%Y-%m-%d\") as date_start, e.data, e.summary"+
            " from event e" +
            " where e.event_id=?",
            [eventId]
        );
        let event = Object.assign({}, events[0], JSON.parse(events[0].data));
        delete event.data;
        return event;        
    }

    async updateEventData(eventId, data) {
        return await this._query(
            "update event set data=? where event_id=?",
            [JSON.stringify(data), eventId]
        );
    }
}