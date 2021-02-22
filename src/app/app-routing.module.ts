import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CitiesListComponent } from "./cities-list/cities-list.component";
//import { CityBranchesResolver } from "./services/branches.in.city.resolver";
import { BranchComponent } from "./branch/branch.component";
import { BranchDetailsResolver } from "./services/branch.details.resolver";
import { AppComponent } from "./app.component";
import { CityBranchesComponent } from "./branches-table/city-branches.component";
import { DefaultlayoutComponent } from "./defaultlayout/defaultlayout.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", pathMatch: "full", component: DefaultlayoutComponent },
      { path: "branches", component: CityBranchesComponent },
      { path: "branches/details/:ifsc", component: BranchComponent }
    ]
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

/*{
    path: "branches/:q",
    component: CitiesListComponent,
    resolve: {
      branchCount: CityBranchesResolver
    },
    children:[]
  }*/
