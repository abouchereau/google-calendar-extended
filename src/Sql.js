const mysql = require('mysql'); 

module.exports = class Sql {

    conn = null;
    HOST = "localhost";
    USER = "root";
    PASS = "root";
    BDD = "saugcal";

    constructor() {
        this._createConnection();

    }

    _createConnection() {
        this.conn = mysql.createConnection({
            host: this.HOST,
            user: this.USER,
            password: this.PASS,            
            database: this.BDD
          });
    }
    
    _connect() {
        return new Promise((resolve, reject)=>{
            this.conn.connect(err => {
                if (err) {                
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    _query(...params) {
        return new Promise((resolve, reject)=>{
            this.conn.query(...params, (err, res) => {
                if (err) {                
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }

    async truncate() {
        await this._query("SET foreign_key_checks = 0");
        await this._query("truncate event");
        await this._query("truncate cal");
        await this._query("SET foreign_key_checks = 1");
    }

    async insertEvent(event) {
        await this._query(
            "insert into event(event_id, cal_id, summary, date_start, data) values(?,?,?,?,?)", event            
        );
    }

    async createOrUpdateEvent(event) {
        let nb = await this._query("select id from event where event_id=?", event[0]);
        if (nb.length==1) {
            await this.updateEvent(event);
        }
        else {
            await this.insertEvent(event);
        }
    }

    async insertCal(cal) {
        //TODO : if not exists

        await this._query(
            "insert into cal(cal_id, color_front, color_back, summary) values(?,?,?,?)",
            [cal.id, cal.foregroundColor, cal.backgroundColor, cal.summary]
        );
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

    async updateEvent(event) {
        return await this._query(
            "update event set summary=?, date_start=?, data=? where event_id=?",
            [event[2], event[3], event[4], event[0]]
        );
    }

    async getCalList() {
        return await this._query("select id, cal_id, color_front, color_back, summary from cal");
    }
}
/*
(async ()=> {
    
    const sql = new Sql();
    try {
        await sql.connect();
    }
    catch(e) {
        console.log("POUET");
    }

    try {
        await sql.query("insert into dates(event_id, cal_id, cal_name, summary, date_start, data) VALUES (?,?,?,?,?,?)",
            ["123","321","hhi","knjk","2024-10-24","{}"]
        );
    }
    catch (e) {
        console.log("ERROR", e);
    }
    

    try {
        console.log(await sql.query("SELECT * FROM dates"));
    }
    catch (e) {
        console.log("ERROR", e)
    }

    

})();
*/
