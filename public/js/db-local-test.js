class Main {

    db = null;

    constructor() {
        this.initDb().then(()=> {
            this.syncAll();
           //this.addProperties();
        });
        
    }

    async initDb() {      
        this.db = new Dexie('saugDb');
        try {
            this.db.version(1).stores({
            dates: ` ++id,
                enventId,
                groupe,
                date,
                ville,
                codePostal,
                nomEvenement,
                payant,
                suiviDevisContrat,
                dateEnvoi,
                montant,
                feuilleDeRoute,
                heureConcerts,
                lieuRdv,
                heureDebutConcert,
                heureBalance,
                heureRdvRepas,
                heureArrivee,
                heureDepart,
                heureRetour,
                equipeMusiciens,
                equipeTechnique,
                tempsChargementMinute,
                infoSets,
                vehicule,
                dateDepartCrafter,
                dateRetourCrafter,
                vehiculesPerso,
                adresseDepart,
                adresseArrivee,
                distanceKm,
                dureeMinutes,
                repas,
                nbVegetariens,
                nbSansGlut,
                nbLact,
                allergies,
                repas1,
                horaireRepas1,
                repas2,
                horaireRepas2,
                repas3,
                horaireRepas3,
                dateArriveeHebergement,
                adresseHebergement,
                contactHebergement,
                contactTechnique,
                contactAccueil,
                contactOrga,
                envoiKitCom,
                contactCom,
                lien,
                precisions`
          });
        } catch (e) {
            console.log("Erreur lors la création de la BDD", e.message)
        }
      /*  await db.dates.add({
            name: "pio22ppo",
            age: 65,
          });
          let array = await db.dates.orderBy('id').reverse().toArray();*/

    }

    async syncAll() {
        await this.db.dates.clear();
        const dateDebut = new Date("05 October 2011 14:48 UTC");
        let params = [
            //"timeMin="+dateDebut.toISOString(),
            "key="+Const.GOOGLE_KEY,
            "fields=items(id,summary,start,description)"
            //w"fields=items(id,location,summary,start,description,status,extendedProperties)"
        ];      
        let url = "https://www.googleapis.com/calendar/v3/calendars/"+Const.BANDS[0].calId+"/events?"+params.join("&");
        let reponse = await fetch(url);
        let tableau = await reponse.json();
        for(let item of tableau.items) {
            await this.db.dates.put(this.mapGoogleToDb(item, 'fanfare'));
        }

    }

    mapGoogleToDb(item, groupe) {
        console.log(item.start);
        /*
        //dateTime: "2015-11-21T21:30:00+01:00"
        ou
        date "2015-12-13"
        */
       let date = "";
       if (item.start.dateTime != null) {
        date = item.start.dateTime.substr(0,10);
       }
       else {
        date = item.start.date;
       }
        
        return {
            eventId: item.id,
            groupe: groupe,
            date: new Date(date),
            nomEvenement: item.summary,
            infoSets: item.description
        }
    }

    async addProperties() {
         let props = {
            "extendedProperties": {
              "private": {
                "crafter": "O",
                "equipe":"Gilles Chauprade, Guillaume Trocmé"
              }
            }
          };
          

        let eventId = "5d67tafqh95m33p7rmv3o9ucis";
        let url = "https://cors-anywhere.herokuapp.com/https://www.googleapis.com/calendar/v3/calendars/"+Const.BANDS[0].calId+"/event/"+eventId;
        let reponse = await fetch(url,  {
            method: 'PATCH',
            headers: {
                //'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(props)
          }).then(async response => console.log( await response.json()));
    }

}

/**
 *         
        let eventId = "5d67tafqh95m33p7rmv3o9ucis";
        let url2 = "https://www.googleapis.com/calendar/v3/calendars/"+cals[0].id+"/events/"+eventId+"?"+params2.join("&");
 */
