import { Component, OnInit } from '@angular/core';
//import {City} from '../city/city.model';
import {CITIES} from '../mock-cities';
import {City} from '../city';
import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})


export class CitiesListComponent implements OnInit {

	
  cities = CITIES;
  selectedCity : City;

  constructor() { }

  ngOnInit(): void {

  }

  onCitySelection(city: City){
    this.selectedCity = city;
    console.log("Slected city: " + JSON.stringify(city));
  }

}
