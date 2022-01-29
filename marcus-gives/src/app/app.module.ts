import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProjectsComponent} from "./pages/projects/projects.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {GoalsComponent} from "./pages/goals/goals.component";
import {CommonModule} from "@angular/common";
import {ProjectService} from "./services/project.service";
import { HttpClientModule} from "@angular/common/http";
import {ClientService} from "./services/client.service";
import {ComponentsModule} from "./components/components.module";
import {NavigationComponent} from "./navigtion/navigation.component";
import {AgGridModule} from "ag-grid-angular";
import {ClientGridComponent} from "./pages/clients/client-grid/client-grid.component";
import {ClientProfileComponent} from "./pages/clients/client-profile/client-profile.component";

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ClientsComponent,
    GoalsComponent,
    NavigationComponent,
    ClientGridComponent,
    ClientProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    ProjectService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
