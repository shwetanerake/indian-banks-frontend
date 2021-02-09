import { Component, Input, OnInit } from "@angular/core";
import { CITIES } from "../mock-cities";
import { BranchesListComponent } from "../branches-list/branches-list.component";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import { SelectedCityService } from "../shared/selected-city.service";
import { City } from "../city";
//import { BranchService } from "../branch/branch.service";
import { Router } from "@angular/router";

@Component({
  selector: "cities-list",
  templateUrl: "./cities-list.component.html",
  styleUrls: ["./cities-list.component.css"]
})

export class CitiesListComponent implements OnInit {
  //static array of 5 cities
  cities = CITIES;

  @Input() branchListComponent: BranchesListComponent;

  citySelected : City;

  constructor(
    private router: Router,
    private selectedCityService: SelectedCityService
  ) {
    console.log(
      "CitiesListComponent | constructor ");
  }

  /*constructor(
    private router: Router,
    private branchService: BranchService,
    private selectedCityService: SelectedCityService
  ) {}*/

  ngOnInit(): void {
    
    this.citySelected = this.cities[0];
    console.log(
      "CitiesListComponent | ngOnInit | city selected: " + JSON.stringify(this.citySelected)
    );
    this.selectedCityService.setSelectedCity(this.citySelected);
    this.router.navigateByUrl("api/branches/" + this.citySelected.name);
    console.log(
      "CitiesListComponent | navigated to: " + "api/branches/" + this.citySelected.name
    );
    //this.branchService.findBranchesByCityName(this.citySelected.name.toString());
  }

  onCitySelection(city: City) {
   
    this.citySelected = city;
    this.selectedCityService.setSelectedCity(this.citySelected);
    this.branchListComponent.loadBranchesOnCitySelection(this.citySelected.name.toString(),'');
    console.log(
      "CitiesListComponent | Slected city : " +
        JSON.stringify(this.selectedCityService.getSelectedCity())
    );
    this.router.navigateByUrl("api/branches/" + this.citySelected.name);
  }
}
