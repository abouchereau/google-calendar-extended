import http from 'http';
import express from "express";;
import GoogleCal from "./GoogleCal.js";
import cors from "cors";
import SqlEvent from "./SqlEvent.js";
import SqlCal from "./SqlCal.js";
import Route from "./Route.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'lasaugrenue';
const app = express();
const corsOptions = {
    origin: ["https://cal.lasaugrenue.fr","http://localhost:8000"],
    optionsSuccessStatus: 200 
};

const port = 3615;

//TODO BDD + crpyt
const USERS = {
    username: 'saugrenue',
    password: 'saugrenue'
  };


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

app.get("/loadAllEvents",verifyToken, async (req, res)=> {
    const dateMin   = req.query.dateMin==null?"2020-01-01":req.query.dateMin;
    const dateMax  = req.query.dateMax==null?"2036-01-02":req.query.dateMax;
    console.log("loadAllEvents", dateMin, dateMax);
    await gCal.loadAllEvents(dateMin, dateMax);
    res.send("OK");
});

app.get("/getEventList",verifyToken,async (req, res)=> {           
    const cal   = req.query.cal==null?null:parseInt(req.query.cal); 
    const year  = req.query.year==null?null:parseInt(req.query.year);
    const month = req.query.month==null?null:parseInt(req.query.month);
    let list = await sqlEvent.getEventList(cal, year, month);
    res.send(list);
});

app.get("/getEvent/:id",async (req, res)=> {           
    let event = await sqlEvent.getEvent(req.params.id);
    res.send(event);
});


app.get("/getCalList",verifyToken,async (req, res)=> {            
    let list = await sqlCal.getCalList();
    res.send(list);
});

app.post("/updateEvent/:id",verifyToken, async (req, res)=>{    
    let item = req.body;
    let cal_id = item.cal_id;
    delete item.date_start;
    delete item.id;
    delete item.summary;
    delete item.event_id;
    delete item.cal_id;
    await gCal.updateEvent(req.params.id, cal_id, item);  
    await sqlEvent.updateEventData(req.params.id, item);    
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
        let routeCalc = await route.calculateRoute(coordDepart, coordArrivee, "drive");
        res.send(routeCalc);
    }    
});



app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (username === USERS.username && password === USERS.password) {
        // Générer un JWT
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token }); // Envoyer le token au client
      } else {
        res.status(401).json({ error: 'Identifiants invalides' });
      }
  });