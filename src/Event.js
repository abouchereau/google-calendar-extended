import fs from 'node:fs';
import SqlEvent from "./SqlEvent.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default class Event {

    async updateIncomingEvents() {
        const sqlEvent = new SqlEvent();
        const dates = await sqlEvent.getDatesSite();
        const tab = dates.map(Event.mapToApi);
        fs.writeFileSync(this.#getFilePath(), JSON.stringify(tab), 'utf8');
    }

    async getIncomingEvents(filterCal=null, forceRefresh=false) {
        //vérifie que le fichier a moins de 24h
        if (!fs.existsSync(this.#getFilePath()) || !this.#isFileModifiedInLast24Hours() || forceRefresh) {
            await this.updateIncomingEvents();
        }
        const data = fs.readFileSync(this.#getFilePath(), 'utf8');
        let tab = JSON.parse(data);
        if (filterCal != null) {
            tab = tab.filter(a=>a[1] == filterCal);
        }
        return tab;
    }

    #isFileModifiedInLast24Hours(fiePath) {
        try {
            const stats = fs.statSync(this.#getFilePath());
            const lastModifiedTime = stats.mtime.getTime();
            const currentTime = Date.now();
            const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
            
            return (currentTime - lastModifiedTime) <= twentyFourHoursInMillis;
        } catch (error) {
            console.error('Error checking file:', error);
            return false;
        }
    }

    #getFilePath() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        return __dirname+"/../data/events.json";
    }

    static mapToApi(obj) {
        const data = JSON.parse(obj.data);
        return [
            obj.date_start.toISOString(),
            obj.groupe,
            obj.summary,
            data.ville,
            data.latitude,
            data.longitude,
            data.lien,
            obj.date_start.getDay(),
            obj.date_start.getDate(),
            obj.date_start.getMonth()+1,
            obj.date_start.getFullYear()
        ];
    }
}