import mysql from 'mysql'; 

export default class SqlBase {

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



}
