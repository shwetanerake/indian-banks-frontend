import { Injectable } from '@angular/core';
import {City} from '../city';

@Injectable({
  providedIn: 'root'
})
export class SelectedCityService {

  constructor() { }

  selectedCity : City;

    setSelectedCity(data: City){
    	this.selectedCity = data;
    }

    getSelectedCity(){
    	return this.selectedCity;  
    }
}
