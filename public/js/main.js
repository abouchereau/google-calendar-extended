class Main {


    constructor() {
        this.filter = new Filter();
        this.user = new User();
        this.isLoading = false;
        this.item = {};
        this.persons = [];
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
        let res = await fetch(Const.BASE_API+"/getEvent/"+id, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer "+this.user.getToken(),
                'Content-Type': 'application/json'
            }
        });
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
            "id":this.item.id,
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
    this.persons = await res.json();
    return this.persons;
  }

  async getAllPersons(cal_id=null) {
    let res = await fetch(Const.BASE_API+"/persons"+(cal_id==null?"":"?cal_id="+cal_id), {
        method: 'GET',
        headers: {
        'Authorization': "Bearer "+this.user.getToken(),
        'Content-Type': 'application/json'
        }
    });
    return await res.json();
  }

  async getPerson(id) {
    let res = await fetch(Const.BASE_API+"/person/"+id, {
        method: 'GET',
        headers: {
        'Authorization': "Bearer "+this.user.getToken(),
        'Content-Type': 'application/json'
        }
    });
    return await res.json();
  }

  async getAllJobs(asList=false, cal_id=null) {
    const objParams= {};
    if (asList) {
      objParams["asList"] = "1";
    }
    if (cal_id) {
      objParams["cal_id"] = cal_id;
    }
    const params = new URLSearchParams(objParams).toString();
    let res = await fetch(Const.BASE_API+"/jobs?"+params, {
        method: 'GET',
        headers: {
        'Authorization': "Bearer "+this.user.getToken(),
        'Content-Type': 'application/json'
        }
    });
    return await res.json();
  }
  
  async addJob(cal, job) {
    let data =  {cal, job};
    let res = await fetch(Const.BASE_API+"/job/add", {
        method: 'PUT',
        headers: {
        'Authorization': "Bearer "+this.user.getToken(),
        'Content-Type': 'application/json'
        },        
        body: JSON.stringify(data)
    });
  }

  async addJobPerson(person_id, job_id, is_holder) {
    let data =  {person_id, job_id, is_holder};
    let res = await fetch(Const.BASE_API+"/person_job/add", {
        method: 'PUT',
        headers: {
        'Authorization': "Bearer "+this.user.getToken(),
        'Content-Type': 'application/json'
        },        
        body: JSON.stringify(data)
    });
  }

  async deleteJobPerson(id) {
    let res = await fetch(Const.BASE_API+"/person_job/delete/"+id, {
      method: 'DELETE',
      headers: {
        'Authorization': "Bearer "+this.user.getToken(),
        'Content-Type': 'application/json'
      }
    });
  }

  async addPerson(firstname, lastname) {
    let data = {firstname, lastname};
    let res = await fetch(Const.BASE_API+"/person/add", {
        method: 'PUT',
        headers: {
        'Authorization': "Bearer "+this.user.getToken(),
        'Content-Type': 'application/json'
        },        
        body: JSON.stringify(data)
    });
  }

  async updatePerson(id, firstname, lastname) {
    let data = {id, firstname, lastname};
    await fetch(Const.BASE_API+"/person/update", {
        method: 'POST',
        headers: {
        'Authorization': "Bearer "+this.user.getToken(),
        'Content-Type': 'application/json'
        },        
        body: JSON.stringify(data)
    });
  }

}
