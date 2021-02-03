import { Component,  Input, OnInit } from '@angular/core';
//import {City} from '../city/city.model';
import {CITIES} from '../mock-cities';
import {BranchesListComponent} from '../branches-list/branches-list.component';
import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {SelectedCityService} from '../shared/selected-city.service';
import {City} from '../city';


@Component({
  selector: 'cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})


export class CitiesListComponent implements OnInit {

  cities = CITIES;
  @Input() branchListComponent: BranchesListComponent;
  selectedCity : City;
  selectedValue = null;
  
  constructor(private selectedCityService: SelectedCityService) { 
    

  }

  ngOnInit(): void {
    //this.branchListComponent.loading = false;
    //this.branchListComponent.getData(this.cities[0].name,0,5);
  }

  onCitySelection(city: City){
    this.branchListComponent.getData(city.name,0,5);
    this.selectedCity = city;
    this.selectedCityService.setSelectedCity(this.selectedCity);
    console.log("Slected city : " + JSON.stringify(city));
  }
 

}
