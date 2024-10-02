const express = require("express");
const server = express();
const GoogleCal = require("./GoogleCal");
const cors = require("cors");

var corsOptions = {
    origin: ["https://cal.lasaugrenue.fr","http://localhost:8000"],
    optionsSuccessStatus: 200 // For legacy browser support
}

server.use(cors(corsOptions));

const gCal = new GoogleCal();

server.get("/getEvents",async (req, res)=> {            
    const cal   = req.query.cal; 
    const year  = req.query.year;
    const month = req.query.month;

    let list = await gCal.filteredList(cal, year, month);
    res.send(list);
});

server.get("/getCals",async (req, res)=> {            
    let list = await gCal.listCalendars();
    res.send(list);
});
  
server.listen(3615,()=>{console.log("Le serveur est lancé");})