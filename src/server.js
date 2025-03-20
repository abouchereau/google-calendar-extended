import http from 'http';
import express from "express";;
import GoogleCal from "./GoogleCal.js";
import cors from "cors";
import SqlEvent from "./SqlEvent.js";
import SqlPerson from "./SqlPerson.js";
import SqlCal from "./SqlCal.js";
import SqlJob from "./SqlJob.js";
import Route from "./Route.js";
import Event from "./Event.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'lasaugrenue';
const app = express();
const corsOptions = {
    origin: ["https://cal.lasaugrenue.fr","http://localhost:8000"],
    optionsSuccessStatus: 200 
};

const port = 3615;

//TODO BDD + crpyt
const USERS = [
    {username: 'saugrenue', password: 'saugrenue', write: '0'},
    {username: 'admin-saugrenue', password: 'saugrenue!', write: '1'},
];


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
        return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token invalide.' });
      }
      req.user = user; // Ajoute les informations de l'utilisateur à la requête
      next();
    });
  }

  const checkWriteAccess = (user) => {
    const userObj = USERS.find(u=>u.username==user.username);
    if (userObj) {
        if (userObj.write == '1') {
            return true;
        }
    }
    return false;
  }


app.use(cors(corsOptions));
app.use(express.json());
let server = null;
server = http.createServer({}, app).listen(port, function(){
    console.log("Express server listening on port " + port);
});

const gCal = new GoogleCal();
const sqlEvent = new SqlEvent();
const sqlCal = new SqlCal();
const route = new Route();
const event = new Event();
const sqlPerson = new SqlPerson();
const sqlJob = new SqlJob();

app.get("/loadAllEvents",verifyToken, async (req, res)=> {
    const dateMin   = req.query.dateMin==null?"2020-01-01":req.query.dateMin;
    const dateMax  = req.query.dateMax==null?"2036-01-02":req.query.dateMax;
    await gCal.loadAllEvents(dateMin, dateMax);
    await event.updateIncomingEvents();
    res.send("OK");
});

app.get("/getEventList",verifyToken,async (req, res)=> {     
    const cal   = req.query.cal==null?null:parseInt(req.query.cal); 
    const year  = req.query.year==null?null:parseInt(req.query.year);
    let list = await sqlEvent.getEventList(cal, year);
    res.send(list);
});

app.get("/getEvent/:id",verifyToken, async (req, res)=> {           
    let event = await sqlEvent.getEvent(req.params.id);
    res.send(event);
});


app.get("/getCalList",verifyToken,async (req, res)=> {            
    let list = await sqlCal.getCalList();
    res.send(list);
});

app.get("/getFormules/:cal_id",verifyToken,async (req, res)=> {   
    let list = await sqlCal.getFormules(req.params.cal_id);
    res.send(list.map(a=>a.formule));
});

app.get("/getPersons/:cal_id",verifyToken,async (req, res)=> {   
    let list = await sqlCal.getPersons(req.params.cal_id);
    res.send(list.map(a=>a.fullname));
});

app.post("/updateEvent/:id",verifyToken, async (req, res)=>{    
    if (!checkWriteAccess(req.user)) {
        return res.status(403).json({ error: 'Accès refusé. Droits manquants.' });
    }
    let item = req.body;
    let cal_id = item.cal_id;
    let event_id = item.event_id;
    delete item.date_start;
    delete item.id;
    delete item.summary;
    delete item.event_id;
    delete item.cal_id;
    await gCal.updateEvent(event_id, cal_id, item);  
    await sqlEvent.updateEventData(req.params.id, item);    
    await event.updateIncomingEvents();
    res.send(req.body);
});


let lastCall = 0;
app.post("/calculateRoute",verifyToken, async (req, res)=>{
    let now = Date.now();    
    if(now-lastCall < 2000)  {
        res.send({});
    }
    else  {
        lastCall = now;
        let item = req.body;
        let coordDepart = null;
        let coordArrivee = null;
        try {
            coordDepart = await route.getCoord(item.depart);
        }
        catch(e) {
            res.send('Problème lors de la récupération ces coordonnées de l\'adresse de départ. '+e.message);
        }    
        try {
            coordArrivee = await route.getCoord(item.arrivee);
        }
        catch(e) {
            res.send('Problème lors de la récupération ces coordonnées de l\'adresse d\'arrivée. '+e.message);
        }
        //console.log("coord", coordArrivee);
        sqlEvent.updateCoord(item.id, coordArrivee);
        let routeCalc = await route.calculateRoute(coordDepart, coordArrivee, "drive");
        res.send(routeCalc);
    }    
});



app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find(u=>u.username === username && u.password === password);
    if (user) {
        // Générer un JWT
        const token = jwt.sign({ username: user.username}, JWT_SECRET, { expiresIn: '12h' });
        const write = user.write;
        res.json({ token, username, write }); // Envoyer le token au client
      } else {
        res.status(401).json({ error: 'Identifiants invalides' });
      }
  });

app.get('/getIncomingEvents', async (req, res)=>{    
    const cal   = req.query.cal;
    const forceRefresh = req.query.forceRefresh!=null;
    const dates = await event.getIncomingEvents(cal, forceRefresh);    
    res.send(dates);
});

//musiciens
app.get('/persons',verifyToken, async(req, res)=>{
    const cal_id   = req.query.cal_id;
    const persons = await sqlPerson.getAllPerson(cal_id);
    res.send(persons);
});

//postes
app.get('/jobs', verifyToken, async(req, res)=>{
    const cal_id   = req.query.cal_id;
    const asList   = req.query.asList != null;
    const jobs = await sqlJob.getAllJobs(cal_id, asList);
    res.send(jobs);
});

app.put('/job/add',verifyToken, async(req, res)=>{    
    let cal = req.body.cal;
    let job = req.body.job;
    await sqlJob.addJob(cal, job);
    res.send("ok");
});

app.delete('/job/delete/:id',verifyToken, async(req, res)=>{    
    const id = req.params.id;
    await sqlJob.deleteJob(id);
    res.send("ok");
})


app.put('/person_job/add', verifyToken, async(req, res)=>{    
    let person_id = req.body.person_id;
    let job_id = req.body.job_id;
    let is_holder = req.body.is_holder;
    await sqlJob.addPersonJob(person_id, job_id, is_holder);
    res.send("ok");
})

app.delete('/person_job/delete/:id',verifyToken, async(req, res)=>{    
    const id = req.params.id;
    await sqlJob.deletePersonJob(id);
    res.send("ok");
})

app.put('/person/add',verifyToken, async(req, res)=>{    
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    await sqlPerson.addPerson(firstname, lastname);
    res.send("ok");
})

app.post('/person/update',verifyToken, async(req, res)=>{    
    let id = req.body.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    await sqlPerson.updatePerson(id, firstname, lastname);
    res.send("ok");
})

app.delete('/person/delete/:id',verifyToken, async(req, res)=>{    
    const id = req.params.id;
    await sqlPerson.deletePerson(id);
    res.send("ok");
})
