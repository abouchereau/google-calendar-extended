const express = require("express");
const server = express();
const GoogleCal = require("./GoogleCal");
const cors = require("cors");
const Sql = require("./Sql");

var corsOptions = {
    origin: ["https://cal.lasaugrenue.fr","http://localhost:8000"],
    optionsSuccessStatus: 200 // For legacy browser support
}

server.use(cors(corsOptions));
server.use(express.json());

const gCal = new GoogleCal();
const sql = new Sql();

server.get("/loadAllEvents",async (req, res)=> {
    await gCal.loadAllEvents();
});

server.get("/loadLastEvents",async (req, res)=> {
    await gCal.loadLastEvents();
});

server.get("/getEventList",async (req, res)=> {           
    const cal   = req.query.cal==null?null:parseInt(req.query.cal); //y a mieux à faire ?
    const year  = req.query.year==null?null:parseInt(req.query.year);
    const month = req.query.month==null?null:parseInt(req.query.month);
    let list = await sql.getEventList(cal, year, month);
    res.send(list);
});

server.get("/getEvent/:id",async (req, res)=> {           
    let event = await sql.getEvent(req.params.id);
    res.send(event);
});


server.get("/getCalList",async (req, res)=> {            
    let list = await sql.getCalList();
    res.send(list);
});

server.post("/updateEvent/:id",async (req, res)=> {    
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
  
server.listen(3615,()=>{console.log("Le serveur est lancé");})
