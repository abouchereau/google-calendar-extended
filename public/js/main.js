class Main {


    constructor() {
        this.filter = new Filter();
        this.user = new User();
        this.isLoading = false;
        this.item = {};
    }

    async loadAllEvents() {
        let res = await fetch(Const.BASE_API+"/getEventList?"+this.filter.getUrlParams(), {
            method: 'GET',
            headers: {
            'Authorization': "Bearer "+this.user.getToken(),
            'Content-Type': 'application/json'
            }
        });
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
        let res = await fetch(Const.BASE_API+"/getCalList", {
            method: 'GET',
            headers: {
                'Authorization': "Bearer "+this.user.getToken(),
                'Content-Type': 'application/json'
            }
      });
        return await res.json();
    }

    async updateEvent(id, data) {  
        data = Utils.removeEmptyValues(data);      
        let resp = await fetch(Const.BASE_API+"/updateEvent/"+id, {
            method: 'POST',
            headers: {
              'Authorization': "Bearer "+this.user.getToken(),
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
            "mode":this.item.vehicule=="3"?"drive":"light_truck",
        };
        let resp = await fetch(Const.BASE_API+"/calculateRoute", {
            method: 'POST',
            headers: {
              'Authorization': "Bearer "+this.user.getToken(),
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        return await resp.json();
    }

    async refreshDates() {
      const obj = {"dateMin":new Date().toISOString().split('T')[0]};
      const params = new URLSearchParams(obj).toString();
      const resp = await fetch(Const.BASE_API+"/loadAllEvents?"+params, {
        method: 'GET',
        headers: {
          'Authorization': "Bearer "+this.user.getToken(),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
    }

    async refreshAllDates() {
      const obj = {"dateMin":"2010-01-01"};
      const params = new URLSearchParams(obj).toString();
      const resp = await fetch(Const.BASE_API+"/loadAllEvents?"+params, {
        method: 'GET',
        headers: {
          'Authorization': "Bearer "+this.user.getToken(),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
    }

    async getFormules(cal_id) {
      let res = await fetch(Const.BASE_API+"/getFormules/"+cal_id, {
          method: 'GET',
          headers: {
          'Authorization': "Bearer "+this.user.getToken(),
          'Content-Type': 'application/json'
          }
      });
      return await res.json();
  }

  async getPersons(cal_id) {
    let res = await fetch(Const.BASE_API+"/getPersons/"+cal_id, {
        method: 'GET',
        headers: {
        'Authorization': "Bearer "+this.user.getToken(),
        'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

}
