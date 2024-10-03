const mysql = require('mysql'); 

class Sql {

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
    
    connect() {
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

    query(...params) {
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
}

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

