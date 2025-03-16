class Const {
    static get VERSION() {return "v1.1";};
    static get APP_NAME() {return "Google Calendar Extended";}
    static get GOOGLE_KEY() {return "AIzaSyAzl_5-yQOIDNTpnVV9LOJqUBRI08FrQMM";}
    static get FIRST_YEAR() {return 2010;}    
    static get LAST_YEAR() {return new Date().getFullYear()+1;}
    static get BASE_API() {return location.hostname=="localhost"?"http://localhost:3615":"https://node.lasaugrenue.fr";}
    static get MONTH_LIST() {return [
        "janvier", 
        "février", 
        "mars", 
        "avril", 
        "mai", 
        "juin", 
        "juillet", 
        "août", 
        "septembre", 
        "octobre", 
        "novembre", 
        "décembre"
    ];}
    static get DAY_LIST() {return [
        "lundi", 
        "mardi", 
        "mercredi", 
        "jeudi", 
        "vendredi", 
        "samedi", 
        "dimanche", 
    ];}


    static get STATUTS() {return {
        "1":"Devis envoyé",
        "2":"Contrat envoyé",
        "3":"Confirmé",
        "4":"Annulé/Supprimé"};
    }


    static get OBJ_EMPTY() {
        return {ville:"",
            codePostal:"",
            nomEvenement:"",
            payant:"",
            suiviDevisContrat:"",
            dateEnvoi:"",
            montant:"",
            feuilleDeRoute:"",
            heureConcerts:"",
            lieuRdv:"",
            heureDebutConcert:"",
            heureBalance:"",
            heureRdvRepas:"",
            heureArrivee:"",
            heureDepart:"", 
            heureRetour:"", 
            equipeMusiciens:"",
            equipeTechnique:"",
            tempsChargementMinutes:"",
            infoSets:"",
            vehicule:"",
            dateDepartCrafter:"",
            dateRetourCrafter:"",
            vehiculesPerso:"",
            adresseDepart:"",
            adresseArrivee:"",
            distanceKm:"",
            dureeMinutes:"",
            repas:"",
            nbVegetariens:"",
            nbSansGlut:"",
            nbLact:"",
            allergies:"",
         /*   repas1:"",
            horaireRepas1:"",
            repas2:"",
            horaireRepas2:"",
            repas3:"",
            horaireRepas3:"",*/
            dateArriveeHebergement:"",
            adresseHebergement:"",
            contactHebergement:"",
            contactTechnique:"",
            contactAccueil:"",
            contactOrga:"",
            envoiKitCom: "",
            contactCom: "",
            lien:"",
            precisions:"",
            frequentation: "",
            cachet: "",
            transports: "",
            vehiculesPerso: "",
            train: "",
            location: ""
        };
    }

    static get MUSICIENS() {
        
    }
}

/*
	'MEG' => array('Quatuor Megamix', 'qu3d1n9ktv8he8ifhi38meshbs'),
	'YGR' => array('Ygranka', 'iv7f0t02duq7btl9ireb37thic'),
	'CHO' => array('Choro de Aksak', 'fkspp43nuq3u2i6cimqrktag4k'),
	'FAN' => array('La Fanfare Saugrenue', 'to11pvq2q69m27am45fjggvkpk'),
	'BALO' => array('Le Bal`O`phonic Orchestra', 'gbdijqokvipeuv44rc1uujamjo'),
	'BAL' => array('Le Balluche de la Saugrenue', 'je0pf3nio1rqfb7dl8j71l9aco'),
*/
