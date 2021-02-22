import { Component, Input, OnInit } from "@angular/core";
import { CITIES } from "../model/mock-cities";
import { CityBranchesComponent } from "../branches-table/city-branches.component";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import { SelectedCityService } from "../services/selected-city.service";
import { City } from '../model/city';
import { BranchService } from "../services/branch.service";
//import { Router } from "@angular/router";

@Component({
  selector: "cities-list",
  templateUrl: "./cities-list.component.html",
  styleUrls: ["./cities-list.component.css"]
})

export class CitiesListComponent implements OnInit {
  //static array of 5 cities
  cities = CITIES;

  @Input() cityBranchesComponent: CityBranchesComponent;

  citySelected : City;

  /*constructor(
    private router: Router,
    private selectedCityService: SelectedCityService
  ) {
    console.log(
      "CitiesListComponent | constructor ");
  }*/

 constructor(
    private branchService: BranchService,
    private selectedCityService: SelectedCityService
  ) {
     console.log(
      "CitiesListComponent | constructor ");
  }

  ngOnInit(): void {
    
    this.citySelected = this.cities[0];
    console.log(
      "CitiesListComponent | ngOnInit | city selected: " + JSON.stringify(this.citySelected)
    );
    this.selectedCityService.setSelectedCity(this.citySelected);
    //this.router.navigateByUrl("branches/" + this.citySelected.name);
    console.log(
      "CitiesListComponent | navigated to: " + "branches/" + this.citySelected.name
    );
    this.branchService.findBranchesByCityName(this.citySelected.name.toString());
  }

  onCitySelection(city: City) {
   
    this.citySelected = city;
    this.selectedCityService.setSelectedCity(this.citySelected);
    
    this.cityBranchesComponent.loadBranchesOnCitySelection(this.citySelected.name.toString(),'');
    console.log(
      "CitiesListComponent | Slected city : " +
        JSON.stringify(this.selectedCityService.getSelectedCity())
    );

    //this.router.navigateByUrl("branches/" + this.citySelected.name);
  }
}
