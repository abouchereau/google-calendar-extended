const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require("express");
const GoogleCal = require("./GoogleCal");
const cors = require("cors");
const Sql = require("./Sql");



const app = express();
const corsOptions = {
    origin: ["https://cal.lasaugrenue.fr","http://localhost:8000"],
    optionsSuccessStatus: 200 // For legacy browser support
};
//const dirname = path.dirname(url.fileURLToPath(import.meta.url));

const port = 3615;

app.use(cors(corsOptions));
app.use(express.json());
let server = null;
if (process.platform=="win32") {//local
    server = http.createServer({}, app).listen(port, function(){
        console.log("Express server listening on port " + port);
      });
} else {//serveur
    const key = fs.readFileSync(__dirname + '/selfsigned.key');
    const cert = fs.readFileSync(__dirname + '/selfsigned.crt');
    const options = {key, cert};
    server = https.createServer(options, app).listen(port, function(){
        console.log("Express server listening on port " + port);
      });
}




const gCal = new GoogleCal();
const sql = new Sql();

app.get("/loadAllEvents",async (req, res)=> {
    await gCal.loadAllEvents();
});

app.get("/loadLastEvents",async (req, res)=> {
    await gCal.loadLastEvents();
});

app.get("/getEventList",async (req, res)=> {           
    const cal   = req.query.cal==null?null:parseInt(req.query.cal); //y a mieux à faire ?
    const year  = req.query.year==null?null:parseInt(req.query.year);
    const month = req.query.month==null?null:parseInt(req.query.month);
    let list = await sql.getEventList(cal, year, month);
    res.send(list);
});

app.get("/getEvent/:id",async (req, res)=> {           
    let event = await sql.getEvent(req.params.id);
    res.send(event);
});


app.get("/getCalList",async (req, res)=> {            
    let list = await sql.getCalList();
    res.send(list);
});

app.post("/updateEvent/:id",async (req, res)=> {    
    let item = req.body;
    let cal_id = item.cal_id;
    delete item.date_start;
    delete item.id;
    delete item.summary;
    delete item.event_id;
    await gCal.updateEvent(req.params.id, cal_id, item);  
    await sql.updateEvent(req.params.id, item);    
    res.send(req.body);
});
  
//server.listen(3615,()=>{console.log("Le serveur est lancé");})
