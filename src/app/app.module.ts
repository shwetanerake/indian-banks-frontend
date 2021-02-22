import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CitiesListComponent } from "./cities-list/cities-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { SelectedCityService } from "./services/selected-city.service";
import { FormsModule } from "@angular/forms";
import { FavouriteComponent } from "./favourite/favourite.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { CityBranchesResolver } from "./services/branches.in.city.resolver";
import { BranchService } from "./services/branch.service";
import { CacheRegistrationService } from "./services/cache.registeration.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppHttpInterceptor } from "./services/app.http-interceptor";
import { BranchComponent } from "./branch/branch.component";
import { CityBranchesComponent } from "./branches-table/city-branches.component";
import { BranchDetailsResolver } from "./services/branch.details.resolver";
import { DefaultlayoutComponent } from './defaultlayout/defaultlayout.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesListComponent,
    FavouriteComponent,
    BranchComponent,
    CityBranchesComponent,
    DefaultlayoutComponent
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
  providers: [
    CacheRegistrationService,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    CityBranchesResolver,
    SelectedCityService,
    BranchService,
    BranchDetailsResolver
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
