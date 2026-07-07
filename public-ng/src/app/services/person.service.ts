import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Config } from '../core/config';
import { Observable } from 'rxjs';
import { Person } from '../models/entity/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {

   private readonly http = inject(HttpClient);

   getAllPersons(cal_id:string|null=null): Observable<Person[]> {
      return this.http.get<Person[]>(Config.BASE_API+"/persons"+(cal_id==null?"":"?cal_id="+cal_id));
   }

  addJobPerson(person_id:number, job_id:number, is_holder:number): Observable<string> {
    let data =  {person_id, job_id, is_holder};
    return this.http.put(Config.BASE_API+"/person_job/add", data, { responseType: 'text' });
  }

  deleteJobPerson(id:number): Observable<string> {
    return this.http.delete(Config.BASE_API+"/person_job/delete/"+id, { responseType: 'text' });
  }

  addPerson(firstname: string, lastname: string): Observable<string> {
    let data = {firstname, lastname};
    return this.http.put(Config.BASE_API+"/person/add", data, { responseType: 'text' });
  }

  updatePerson(id: number, firstname: string, lastname: string): Observable<string> {
    let data = {id, firstname, lastname};
    return this.http.post(Config.BASE_API+"/person/update",data, { responseType: 'text' });
  }

  deletePerson(id: number): Observable<string> {
    return this.http.delete(Config.BASE_API+"/person/delete/"+id, { responseType: 'text' });
  }

}
