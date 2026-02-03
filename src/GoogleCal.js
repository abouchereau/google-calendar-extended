import { promises as fs } from 'fs';
import {authenticate} from '@google-cloud/local-auth';
import {google} from 'googleapis';
import SqlEvent from './SqlEvent.js';
import SqlCal from './SqlCal.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default class GoogleCal {

    SCOPES = [
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
    ];
    TOKEN_PATH = __dirname+"/../token.json";
    CREDENTIALS_PATH = __dirname+"/../credentials.json";
    static CALS_WHITE_LIST = [
        "on5gse3sr1mi5lnvqd79fr76h4@group.calendar.google.com",//Duo / Trio / Quatuor SAUGRENUE	
        "je0pf3nio1rqfb7dl8j71l9aco@group.calendar.google.com",//DATES Le Balluche de la Saugrenue	
        "fkspp43nuq3u2i6cimqrktag4k@group.calendar.google.com",//Choro De Aksak	
        "kmg2oeur0qi64r1c12qaki7d7k@group.calendar.google.com",//DUO FINES LAMES	
        "gqma0kkiiqu2p1q1sgn4dmv5k8@group.calendar.google.com",//KIFF KIFF	
        "e7a3ctp5d5kvrng1ik9tfka9a8@group.calendar.google.com",//SUCK DA HEAD	
        "to11pvq2q69m27am45fjggvkpk@group.calendar.google.com"//La Fanfare Saugrenue	
    ];
    /*
   static EXCLUDE_CALS = [
        'Numéros de semaine',
        "djefcaire@gmail.com",
        "m.torsat@gmail.com",
        "communicationlasaugrenue@gmail.com",
        "Indispo gilles",
        "Atelier de Fabrication",
        "Espace Chapiteau",
        "Halle",
        "Indispo Simon",
        "Caterings",
        "renaud.detruit@gmail.com",
        "Salle de Danse",
        "Studio d'enregistrement",
        "suckdaheadbrassband@gmail.com",
        "jeanguyo88@gmail.com",
        "benoist.pasquier@gmail.com",
        "37 ème Parallèle",
        "EVEN / FEST /",
        "Agenda Océane",
        "florentsepchat@gmail.com",
        "Indispo/Absences Max",
        "agendacollectifsaugrenue@gmail.com",
        "Indisponibilités",
        "production.la.saugrenue@gmail.com",
        "agendacollectifsaugrenue@gmail.com",
        "Occupation du labo",
        "FANFARE",
        "BALLUCHE",
        "CHORO",
        "BOOKING",
        "P1N0",
        "CHORO orga",
        "FANFARE orga"
    ];*/

    sqlEvent = null;
    sqlCal = null;
    client = null;

    constructor() {
        this.sqlEvent = new SqlEvent();
        this.sqlCal = new SqlCal();
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

    async loadAllEvents(dateMin='2000-01-01', dateMax="2036-01-01") {
        console.log("loadAllEvents", dateMin, dateMax);
        const auth = await this.getClient();
        const calendar = google.calendar({version: 'v3', auth});
        const res = await calendar.calendarList.list({});   
        await this.sqlEvent.prepareSync(dateMin, dateMax);
        for (let cal of res.data.items) {
            if (GoogleCal.CALS_WHITE_LIST.includes(cal.id)) {                 
                console.log("--CAL--", cal.summary);
                await this.sqlCal.insertOrUpdateCal(cal);               
                const res = await calendar.events.list({      
                    timeMin: dateMin+"T00:00:00-01:00",      
                    timeMax: dateMax+"T00:00:00-01:00",
                    calendarId: cal.id, 
                    maxResults: 2000,
                    singleEvents: true,
                    orderBy: 'startTime',
                });
                const events = res.data.items.map(a=>this.mapEvent(a, cal));
                console.log(events.length+" events");
                if (events && events.length > 0) {
                    for (let event of events) {
                        await this.sqlEvent.insertOrUpdateEvent(event);
                    }                    
                }
                console.log("--END CAL--", cal.summary);
            }
        }
        console.log("-----FIN-----");
    }

    async _loadAll(auth) {
        const calendar = google.calendar({version: 'v3', auth});
        const res = await calendar.calendarList.list({});      
        this.calsList = [];
        this.fullEventList = [];
        for (let cal of res.data.items) {    
            if (GoogleCal.CALS_WHITE_LIST.includes(cal.summary)) {     
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
                this.sqlCal.insertOrUpdateCal(cal);

            }
        }        
    }

    mapEvent(x, cal) {
        let data = {};
        if (x.extendedProperties != null && x.extendedProperties.private != null) {
            data = x.extendedProperties.private;
        }                
        let date = new Date(x.start.dateTime || x.start.date);  
        let dateEnd = new Date(x.end.dateTime || x.end.date);
        console.log(x.id, cal.id, date, x.summary);
        return [x.id, cal.id, x.summary, x.description, date, dateEnd, JSON.stringify(data)];
    } 
    
    


    async listCalendars() {
        if (!this.dataIsLoaded()) {
            let client = await this.authorize();
            await this._loadAll(client);
        }
        return this.calsList;
    }


    async updateEvent(id, calId, item) {   
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
        const res = await calendar.events.patch(data);

        const res2 = await calendar.events.get({
            calendarId: calId,   
            eventId: id,
        });
        return res2.data.extendedProperties.private;

    }


}