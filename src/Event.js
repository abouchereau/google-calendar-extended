import fs from 'node:fs';
import SqlEvent from "./SqlEvent.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import GoogleCal from "./GoogleCal.js";

export default class Event {

    async updateIncomingEvents() {
        const sqlEvent = new SqlEvent();        
        const dates = await sqlEvent.getDatesSite();
        const tab = dates.map(Event.mapToApi);
        fs.writeFileSync(this.#getFilePath(), JSON.stringify(tab), 'utf8');
    }

    async getIncomingEvents(filterCal=null, forceRefresh=false) {
        if (forceRefresh) {
            const gCal = new GoogleCal();
            gCal.loadAllEvents(new Date().toISOString().split('T')[0]);
        }
        //vérifie que le fichier a moins de n hours
        if (!fs.existsSync(this.#getFilePath()) || !this.#isFileModifiedInLastNHours(1) || forceRefresh) {
            await this.updateIncomingEvents();
        }
        const data = fs.readFileSync(this.#getFilePath(), 'utf8');
        let tab = JSON.parse(data);
        if (filterCal != null) {
            tab = tab.filter(a=>a[1] == filterCal);
        }
        return tab;
    }

    #isFileModifiedInLastNHours(n=24) {
        try {
            const stats = fs.statSync(this.#getFilePath());
            const lastModifiedTime = stats.mtime.getTime();
            const currentTime = Date.now();
            const millis = n * 60 * 60 * 1000;
            
            return (currentTime - lastModifiedTime) <= millis;
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
        let groupe = obj.groupe;
        if (groupe.toUpperCase().indexOf("BALLUCHE") >-1) {
            if (data.formule != null && data.formule.indexOf("GOM")>-1) {
                groupe = "Gang of Musette";
            }
            else {
                groupe = "Balluche Sound System";
            }       
        }
        else if (groupe.toUpperCase().indexOf("FANFARE") >-1) {
            groupe = "La Fanfare Saugrenue";
        }
        else if (groupe.toUpperCase().indexOf("CHORO") >-1) {
            groupe = "Choro de Aksak";
        }
        else if (groupe.toUpperCase().indexOf("KIF") >-1) {
            groupe = "kiffKiff";
        }
        else if (groupe.toUpperCase().indexOf("LAME") >-1) {
            groupe = "Duo Fines Lames";
        }
        else if (groupe.toUpperCase().indexOf("SUC") >-1) {
            groupe = "Suck Da Head";
        }
        return [
            obj.date_start.toISOString(),
            groupe,
            obj.summary.replace(/\[[^\]]*\]\s*/g, '').trim(),
            data.ville || "",
            data.latitude,
            data.longitude,
            data.lien || "",
            obj.date_start.getDay(),
            obj.date_start.getDate(),
            obj.date_start.getMonth()+1,
            obj.date_start.getFullYear()
        ];
    }


}