const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {



  const calendar = google.calendar({version: 'v3', auth});
  const res = await calendar.events.list({
    //calendarId: 'tfcb4r1u9mu389qi41oo1nlsek@group.calendar.google.com',    
    //calendarId: "je0pf3nio1rqfb7dl8j71l9aco%40group.calendar.google.com",    
    //calendarId: ""
    calendarId: "to11pvq2q69m27am45fjggvkpk%40group.calendar.google.com",    
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');
  events.map((event, i) => {
    //console.log(event);
    const start = event.start.dateTime || event.start.date;
    console.log(`${event.id} - ${start} - ${event.summary}`);
  });
}

//authorize().then(listEvents).catch(console.error);


async function listCalendars(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    const res = await calendar.calendarList.list({

    });
    console.log(res.data.items);

  }

async function updateEvent(auth) {
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

  authorize().then(listEvents).catch(console.error);