const fs = require('fs').promises;
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const Const = require('../public/js/const');
const Sql = require('./Sql.js');

module.exports = class GoogleCal {

    SCOPES = [
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
    ];
    TOKEN_PATH = __dirname+"/../token.json";
    CREDENTIALS_PATH = __dirname+"/../credentials.json"
    EXCLUDE_CALS = ['Numéros de semaine'];

    sql = null;
    client = null;

    constructor() {
        this.sql = new Sql();
    }

    async loadSavedCredentialsIfExist() {
        try {
            const content = await fs.readFile(this.TOKEN_PATH);
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
        } catch (err) {
            return null;
        }
    }

    async saveCredentials(client) {
        const content = await fs.readFile(this.CREDENTIALS_PATH);
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await fs.writeFile(this.TOKEN_PATH, payload);
    }

    async getClient() {
        if (this.client == null) {
            this.client = await this.authorize();
        }
        return this.client;
    }

    async authorize() {
        let client = await this.loadSavedCredentialsIfExist();
        if (client) {
            return client;
        }
        client = await authenticate({
            scopes: this.SCOPES,
            keyfilePath: this.CREDENTIALS_PATH,
        });
        if (client.credentials) {
            await this.saveCredentials(client);
        }
        return client;
    }

    async loadAllEvents() {
        const auth = await this.getClient();
        const calendar = google.calendar({version: 'v3', auth});
        const res = await calendar.calendarList.list({});      
        await this.sql.truncate();
        for (let cal of res.data.items) {
            if (!this.EXCLUDE_CALS.includes(cal.summary)) {                 
                this.sql.insertCal(cal);               
                const res = await calendar.events.list({                    
                    calendarId: cal.id, 
                    maxResults: 2000,
                    singleEvents: true,
                    orderBy: 'startTime',
                });
                const events = res.data.items.map(a=>this.mapEvent(a, cal));
                if (events && events.length > 0) {
                    for (let event of events) {
                        await this.sql.insertEvent(event);
                    }
                    
                }
            }
        }
        //TODO ne s'arrête pas :/
    }

    _insertCalDb(cal) {
        this.sql.insertCal(this._mapCal(cal));
    }

    async _loadAll(auth) {
        const calendar = google.calendar({version: 'v3', auth});
        const res = await calendar.calendarList.list({});      
        this.calsList = [];
        this.fullEventList = [];
        for (let cal of res.data.items) {    
            if (!this.EXCLUDE_CALS.includes(cal.summary)) {     
                const res = await calendar.events.list({
                    calendarId: cal.id, 
                    maxResults: 1000,
                    singleEvents: true,
                    orderBy: 'startTime',
                });
                const events = res.data.items.map(a=>this.mapEvent(a, cal));
                if (events && events.length > 0) {
                    this.fullEventList = this.fullEventList.concat(events);
                }
                this.sql.insertCal(cal);

            }
        }        
    }

    mapEvent(x, cal) {
        let data = {};
        if (x.extendedProperties != null && x.extendedProperties.private != null) {
            data = x.extendedProperties.private;
        }                
        let date = new Date(x.start.dateTime || x.start.date);       
        return [x.id, cal.id, x.summary, date, JSON.stringify(data)];
    } 
    
    


    async listCalendars() {
        if (!this.dataIsLoaded()) {
            let client = await this.authorize();
            await this._loadAll(client);
        }
        return this.calsList;
    }


    async updateEvent(id, calId, item) {
        
        console.log("ITEM", item);
        const auth = await this.getClient();
        const calendar = google.calendar({version: 'v3', auth});
        let data = {        
            "calendarId": calId,   
            "eventId": id,
            "requestBody" : {
                "extendedProperties": {
                    "private": item
                }
            }
        };
        console.log("DATA", data);
        const res = await calendar.events.patch(data);

        const res2 = await calendar.events.get({
            calendarId: calId,   
            eventId: id,
        });
        console.log(res2.data.extendedProperties.private);
        return res2.data.extendedProperties.private;

    }

    async syncLastDates() {
        
    }
    



}