import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesListComponent } from './cities-list/cities-list.component';
import { CityBranchesResolver } from "./services/city.branches.resolver";

const routes: Routes = [
	{
        path: 'api/branches/:q',
        component: CitiesListComponent,
        resolve: {
            course: CityBranchesResolver
        }
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { 

	
}
