import { Injectable } from '@angular/core';
import { Filter } from '../models/entity/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filter = new Filter(); 

}