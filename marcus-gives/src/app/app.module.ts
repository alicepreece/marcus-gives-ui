import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProjectsComponent} from "./pages/projects/projects.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {GoalsComponent} from "./pages/goals/goals.component";
import {NavigationComponent} from "./navigtion/navigation.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ClientsComponent,
    GoalsComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
