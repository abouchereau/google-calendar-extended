class Main {


    constructor() {
        this.filter = new Filter();
        this.isLoading = false;
        this.item = {};
    }

    async loadAllEvents() {
        let res = await fetch(Const.BASE_API+"/getEventList?"+this.filter.getUrlParams());
        let json = await res.json();
        return json.map(x=>{x.date_start=new Date(x.date_start);return x})
    }

    async getEvent(id) {
        let res = await fetch(Const.BASE_API+"/getEvent/"+id);
        let event = await res.json();
       // event.date_start = new Date(event.date_start);
        event = { ...Const.OBJ_EMPTY, ...event };
        return event;
    }

    async loadCals() {
        let res = await fetch(Const.BASE_API+"/getCalList");
        return await res.json();
    }

    async updateEvent(id, data) {  
        data = Utils.removeEmptyValues(data);      
        let resp = await fetch(Const.BASE_API+"/updateEvent/"+id, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        return resp.json();
    }

    async calculateRoute() {     
        let data =  {
            "depart":this.item.adresseDepart,
            "arrivee":this.item.adresseArrivee,
            "mode":"",
        };
        let resp = await fetch(Const.BASE_API+"/calculateRoute", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        return resp.json();
    }

}
