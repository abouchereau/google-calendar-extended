const GoogleCal = require("./GoogleCal");

(async ()=>{
    let gCal = new GoogleCal();
    console.log("-----------");
    let client = await gCal.authorize();
    console.log(await gCal.listAllEvents(client))
    //gCal.authorize().then(async a=>console.log(await gCal.listCalendars(a)));
    //let dates = await gCal.listCalendars();

})();
