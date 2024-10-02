import fetch from 'node-fetch';

(async ()=>{

    const props = {
    "extendedProperties": {
        "private": {
        "crafter": "O",
        "equipe":"Gilles Chauprade, Guillaume Trocmé"
        }
        }
    };

    const conf = {"web":{"client_id":"947007762402-tpqa47so6s572r737tv3d64cncudshp3.apps.googleusercontent.com","project_id":"saugrenue","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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"}};
    

    const eventId = "5d67tafqh95m33p7rmv3o9ucis";
   // const accessToken = "AIzaSyAzl_5-yQOIDNTpnVV9LOJqUBRI08FrQMM";
    //const calId = "to11pvq2q69m27am45fjggvkpk%40group.calendar.google.com";
    const calId = "je0pf3nio1rqfb7dl8j71l9aco%40group.calendar.google.com";
    const accessToken = "947007762402-tpqa47so6s572r737tv3d64cncudshp3.apps.googleusercontent.com";
    const secretClient = "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";
    //let url = "https://www.googleapis.com/calendar/v3/calendars/"+calId+"/event/"+eventId;
    const url = "https://www.googleapis.com/calendar/v3/calendars/primary/events/"+eventId;
    const reponse = fetch(url,  {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${secretClient}`,
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(props)
        }).then(async response => console.log( await response.text())).catch(console.log);

})();