import http from 'http';
import express from "express";;
import GoogleCal from "./GoogleCal.js";
import cors from "cors";
import SqlEvent from "./SqlEvent.js";
import SqlCal from "./SqlCal.js";


const app = express();
const corsOptions = {
    origin: ["https://cal.lasaugrenue.fr","http://localhost:8000"],
    optionsSuccessStatus: 200 
};

const port = 3615;

app.use(cors(corsOptions));
app.use(express.json());
let server = null;
server = http.createServer({}, app).listen(port, function(){
    console.log("Express server listening on port " + port);
});

const gCal = new GoogleCal();
const sqlEvent = new SqlEvent();
const sqlCal = new SqlCal();

app.get("/loadAllEvents",async (req, res)=> {
    const dateMin   = req.query.dateMin==null?"2020-01-01":req.query.dateMin;
    const dateMax  = req.query.dateMax==null?"2020-01-02":req.query.dateMax;
    console.log("loadAllEvents", dateMin, dateMax);
    await gCal.loadAllEvents(dateMin, dateMax);
    res.send("OK");
});

app.get("/getEventList",async (req, res)=> {           
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


app.get("/getCalList",async (req, res)=> {            
    let list = await sqlCal.getCalList();
    res.send(list);
});

app.post("/updateEvent/:id",async (req, res)=>{    
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