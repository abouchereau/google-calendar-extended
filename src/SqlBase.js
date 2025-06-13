import mysql from 'mysql2/promise'; 

export default class SqlBase {

    static POOL;
    HOST = "localhost";
    USER = "root";
    PASS = "root";
    BDD = "saugcal";

    constructor() {
        if (!SqlBase.POOL) {
            SqlBase.POOL = mysql.createPool({
                host: this.HOST,
                user: this.USER,
                password: this.PASS,            
                database: this.BDD,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
        }
    }
    
    async _query(...params) {
        try  {
            const [rows] = await SqlBase.POOL.query(...params);
            return rows;
        }
        catch (err) {
            console.error(err);    
        }        
    }


}
