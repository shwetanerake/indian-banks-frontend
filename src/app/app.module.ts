import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CitiesListComponent } from "./cities-list/cities-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { BranchesListComponent } from "./branches-list/branches-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { SelectedCityService } from "./shared/selected-city.service";
import { FormsModule } from "@angular/forms";
import { FavouriteComponent } from "./favourite/favourite.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { CityBranchesResolver } from "./services/city.branches.resolver";
import { BranchService } from "./branch/branch.service";


@NgModule({
  declarations: [
    AppComponent,
    CitiesListComponent,
    BranchesListComponent,
    FavouriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    NgbModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [ CityBranchesResolver, SelectedCityService, BranchService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
