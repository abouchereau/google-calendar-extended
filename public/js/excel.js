class Excel {

    excelJsPromise = null;
    fileSaverPromise = null;    
    calList = [];
    allEvents = [];

    ROWS = [
        {"cat":"Calendrier","field":"id","type":"int","title":"ID","display":"","width":7},
        {"cat":"Calendrier","field":"event_id","type":"string","title":"ID Google","display":"","width":10},
        {"cat":"Calendrier","field":"sync_google","type":"string","title":"Sur Google Agenda ?","display":a=>this.fromList(a,["Non","Oui"]),"width":7},
        {"cat":"Calendrier","field":"cal_summary","type":"string","title":"Groupe","display":"","width":20},

        {"cat":"Général","field":"summary","type":"string","title":"Nom de l'événement","display":"","width":30},
        {"cat":"Général","field":"date_start","type":"date","title":"Date début","display":this.date,"width":12},
        {"cat":"Général","field":"date_end","type":"date","title":"Date fin","display":this.date,"width":12},
        {"cat":"Général","field":"formule","type":"integer","title":"Formule","display":"","width":7},
        {"cat":"Général","field":"date_envoi","type":"date","title":"Date d'envoi","display":"","width":10},
        {"cat":"Général","field":"code_postal","type":"string","title":"C.P.","display":"","width":7},
        {"cat":"Général","field":"ville","type":"String","title":"Ville","display":"","width":15},
        {"cat":"Général","field":"payant","type":"boolean","title":"Payant ?","display":this.ouiNon,"width":7},
        {"cat":"Général","field":"feuilleDeRoute","type":"boolean","title":"FDR envoyée ?","display":this.ouiNon,"width":7},
        {"cat":"Général","field":"repas","type":"enum","title":"Repas","display":a=>this.fromList(a,["","Prévu Orga", "Collectif Saugrenue", "Pas de repas"]),"width":15},
        {"cat":"Général","field":"suiviDevisContrat","type":"enum","title":"Suivi Devis / Contrat","display":a=>this.fromList(a,["","Devis envoyé","Contrat envoyé","Confirmé","Annulé/Supprimé","En direct"]),"width":15},
        {"cat":"Général","field":"montant","type":"currency","title":"Montant H.T","display":this.currency,"width":12},
        {"cat":"Général","field":"cachet","type":"currency","title":"Cachet Net Musicien","display":this.currency,"width":12},

        {"cat":"Horaires","field":"precisions","type":"string","title":"Précisions","display":"","width":20},
        {"cat":"Horaires","field":"lieuRdv","type":"string","title":"Lieu RDV","display":"","width":15},
        {"cat":"Horaires","field":"heureDepart","type":"time","title":"Heure RDV","display":"","width":7},
        {"cat":"Horaires","field":"heureArrivee","type":"time","title":"Heure Arrivée","display":"","width":7},
        {"cat":"Horaires","field":"heureBalance","type":"time","title":"Heure Balances","display":"","width":7},
        {"cat":"Horaires","field":"heureRdvRepas","type":"time","title":"Heure RDV Repas","display":"","width":7},
        {"cat":"Horaires","field":"heureDebutConcert","type":"time","title":"Heure Début Concert","display":"","width":7},
        {"cat":"Horaires","field":"heureRetour","type":"time","title":"Heure Retour","display":"","width":7},

        {"cat":"Equipe","field":"equipeMusiciens","type":"list[user]","title":"Equipe","display":this.userList,"width":30},

        {"cat":"Transport","field":"transports","type":"list[transport]","title":"Transports","display":this.transport,"width":15},
        {"cat":"Transport","field":"dateDepartCrafter","type":"dateTime","title":"Départ Crafter","display":this.dateTime,"width":15},
        {"cat":"Transport","field":"dateRetourCrafter","type":"dateTime","title":"Retour Crafter","display":this.dateTime,"width":15},
        {"cat":"Transport","field":"vehiculesPerso","type":"list[user]","title":"Véhicule(s) Perso","display":this.userList,"width":15},
        {"cat":"Transport","field":"location","type":"string","title":"Location","display":"","width":15},
        {"cat":"Transport","field":"train","type":"string","title":"Billets de train","display":"","width":15},

        {"cat":"Trajet","field":"adresseDepart","type":"string","title":"Adresse Départ","display":"","width":20},
        {"cat":"Trajet","field":"adresseArrivee","type":"string","title":"Adresse Arrivée","display":"","width":20},
        {"cat":"Trajet","field":"distanceKm","type":"integer","title":"Distance Km","display":Number,"width":7},
        {"cat":"Trajet","field":"dureeMinutes","type":"integer","title":"Durée Trajet","display":"","width":7},

        {"cat":"Hébergement","field":"dateArriveeHebergement","type":"dateTime","title":"Date Arrivée Hébergement","display":this.dateTime,"width":10},
        {"cat":"Hébergement","field":"contactHebergement","type":"string","title":"Contact Hébergement","display":"","width":15},
        {"cat":"Hébergement","field":"adresseHebergement","type":"string","title":"Adresse Hébergement","display":"","width":15},

        {"cat":"Contacts","field":"contactAccueil","type":"string","title":"Contact Accueil","display":"","width":15},
        {"cat":"Contacts","field":"contactTechnique","type":"string","title":"Contact Technique","display":"","width":15},
        {"cat":"Contacts","field":"contactOrga","type":"string","title":"Contact Organisation","display":"","width":15},

        {"cat":"Communication","field":"afficherSite","type":"boolean","title":"Afficher sur le site ?","display":this.ouiNon,"width":7},
        {"cat":"Communication","field":"nomAfficherSite","type":"string","title":"Nom à afficher sur le site","display":"","width":25},
        {"cat":"Communication","field":"lien","type":"string","title":"Lien","display":"","width":15},
        {"cat":"Communication","field":"envoiKitCom","type":"enum","title":"Kit Com","display":a=>this.fromList(a,["","à envoyer","envoyé"]),"width":10},
        {"cat":"Communication","field":"contactCom","type":"string","title":"Contact Com","display":"","width":10},
        {"cat":"Communication","field":"frequentation","type":"integer","title":"Fréquentation","display":Number,"width":7},

        {"cat":"Précision","field":"description","type":"string","title":"Infos set","display":"","width":25}
      ];
  
    

    constructor(calList, allEvents) {
      this.calList = calList;
      this.allEvents = allEvents;
    }

    
   loadExcelJs() {
    return Utils.loadScriptOnce(
      "https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js",
      "ExcelJS",
      { get value() { return this.excelJsPromise; }, set value(v) { this.excelJsPromise = v; } }
    );
  }


   loadFileSaver() {
    return Utils.loadScriptOnce(
      "https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js",
      "saveAs",
      { get value() { return this.fileSaverPromise; }, set value(v) { this.fileSaverPromise = v; } }
    );
  }

    fromList(a, list) {
      if (a != null && Number(a) < list.length) {
        return list[Number(a)];
      }
      return "";
    }

    transport(a) {
      if (a != null) {
        return JSON.parse(a).map(x=>["","Crafter","Véhicule Perso", "Location", "Train"][x]).join(" + ")
      }
      return "";
    }

    ouiNon(a) {
      return {"O":"Oui","N":"Non"}[a];
    }

    calToGroup(a) {
      return this.calList.find(c=>c.cal_id==a).summary;
    }

    dateTime(a) {
      return a.replace("T"," ");
    }

    date(a) {
      if (a) {
        return a;
      }
      return "";
      
    }

    currency(a) {
      a = a.replace(",",".").replace(/[^0-9.]/g, '');            
      return Number(a);
    }

    userList(a) {
      return a.split("||").map(b=>b.split(",")[2]).join(", ");
    }

  async exportExcel() {
    try {
      const [ExcelJS] = await Promise.all([this.loadExcelJs(), this.loadFileSaver()]);

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Feuille 1"); 

      const comptage = Object.values(
        this.ROWS.reduce((acc, { cat }) => {
          acc[cat] = acc[cat] || { cat, count: 0 };
          acc[cat].count++;
          return acc;
        }, {})
      );
      let count = 1;
      //1e ligne
      const colSep = [];
      comptage.forEach(a=>{
        sheet.mergeCells(1, count, 1, count + a.count -1);             
        sheet.getCell(1, count).value = a.cat;
        count += a.count;
        colSep.push(count);
      });
      //2e ligne
      sheet.addRow(this.ROWS.map(a=>a.title));
      //all data
      this.allEvents.forEach(a=>{
        const row = [];
        this.ROWS.forEach(b=>{
          if (a[b.field] != null) {
            if (b.display == "") {
              row.push(a[b.field]==null?"":a[b.field]);
            }
            else {
              const display = b.display(a[b.field]);
              row.push(display);
            }
            row.push
          } else {
            row.push("");
          }
        
        });
        sheet.addRow(row);
      });

      //styles
      for (let i = 1; i <= 2; i++) {
        const row = sheet.getRow(i);
        row.eachCell({ includeEmpty: true }, cell => {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };          
          cell.fill = {type: "pattern", pattern: "solid", fgColor: { argb: "FFDDDDDD" }};
          cell.font = { ...cell.font, bold :true };          
          cell.border = { ...cell.border, bottom: { style: 'thin' }, right: { style: "thin" }};
        });
      }

      for (let i=0; i<this.allEvents.length;i++) {
        const cell = sheet.getCell(i+3, 4);
        if (this.allEvents[i].color_back) {
          cell.fill = {type: "pattern", pattern: "solid", fgColor: { argb: "FF"+this.allEvents[i].color_back.replace("#","") }};
        }        
        if (this.allEvents[i].color_front) {
          cell.font = { ...cell.font, bold :true,  color: { argb: "FF"+this.allEvents[i].color_front.replace("#","") }  };   
        }
        
        const row = sheet.getRow(i+2);
        for (let j = 0 ; j < this.ROWS.length; j++) {
          if (this.ROWS[j].width != "") {
            sheet.getColumn(j+1).width = this.ROWS[j].width; 
          }
          const cell = row.getCell(j+1);
          switch (this.ROWS[j].type) {
            case "currency":
              cell.numFmt = '#,##0.00 €';
              break;
              default: break;
          }
        }
      }

      colSep.forEach(c=>{          
        sheet.eachRow((row) => {
            const cell = row.getCell(c);
            cell.border = { ...cell.border, left: { style: 'thin' }};
        });        
      });

      sheet.autoFilter = {
        from: {
          row: 2,
          column: 1
        },
        to: {
          row: 2,
          column: this.ROWS.length
        }
      };

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      saveAs(blob, "export"+(new Date()).toISOString().substring(0,16).replace("T","_").replace(":","h")+".xlsx");

    } catch (err) {
      console.error("Erreur durant l'export :", err);
      alert("Erreur durant l'export Excel (voir console).");
    }
  }

}