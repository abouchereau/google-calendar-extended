const fs = require('fs').promises;
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const Const = require('../public/js/const');

module.exports = class GoogleCal {

    SCOPES = [
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
    ];
    TOKEN_PATH = __dirname+"/../token.json";
    CREDENTIALS_PATH = __dirname+"/../credentials.json"
    EXCLUDE_CALS = ['Numéros de semaine'];

    calsList = [];
    fullEventList = [];

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
                this.calsList.push(cal);
            }
        }        
    }

    mapEvent(x, cal) {
        let data = {};
        if (x.extendedProperties != null && x.extendedProperties.private != null) {
            data = x.extendedProperties.private;
        }                
        let date = new Date(x.start.dateTime || x.start.date);
        return {
            "id": x.id, 
            "calId": cal.id,
            "calName": cal.summary,
            "summary": x.summary,
            "date": date,
            "data": data
        };
    }   


    async listCalendars() {
        if (!this.dataIsLoaded()) {
            let client = await this.authorize();
            await this._loadAll(client);
        }
        return this.calsList;
    }


    async updateEvent() {
        const auth = await this.getClient();
        const calendar = google.calendar({version: 'v3', auth});

        /*const res = await calendar.events.patch({        
            "calendarId": 'primary',   
            "eventId": "bc9trtm6e26lgd1tpn8ni0nir4_20241006",
            "requestBody" : {
                "extendedProperties": {
                    "private": {
                        "crafter": "O",
                        "equipe":"Gilles Chauprade, Guillaume Trocmé"
                    }
                }
            }
        });*/
        const res2 = await calendar.events.get({
            calendarId: 'primary',   
            eventId: "bc9trtm6e26lgd1tpn8ni0nir4_20241006",
        });
        console.log(res2.data.extendedProperties.private);
        

    }

    dataIsLoaded() {
        return Object.keys(this.fullEventList).length > 0;
    }


    async filteredList(cal=null, year=null, month=null) {
        if (!this.dataIsLoaded()) {
            let client = await this.authorize();
            await this._loadAll(client);
        }
        let filteredList = [...this.fullEventList ];
        if (cal!=null) {
            filteredList = filteredList.filter(a=>a.calId==cal);
        }
        if (year!=null) {
            //console.log(a.date.getYear());
            filteredList = filteredList.filter(a=>a.date.getFullYear()==year);            
        }
        if (month!=null) {
            filteredList = filteredList.filter(a=>a.date.getMonth()==parseInt(month)-1);
        }       
        return filteredList;
    }

}