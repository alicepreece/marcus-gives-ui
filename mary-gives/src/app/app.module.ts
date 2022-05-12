import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProjectsComponent} from "./pages/projects/projects.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {GoalsComponent} from "./pages/goals/goals.component";
import {CommonModule, DatePipe} from "@angular/common";
import {ProjectService} from "./services/project.service";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {ClientRequestService} from "./services/client-request.service";
import {ComponentsModule} from "./components/components.module";
import {NavigationComponent} from "./navigtion/navigation.component";
import {AgGridModule} from "ag-grid-angular";
import {ClientGridComponent} from "./pages/clients/client-grid/client-grid.component";
import {ClientProfileComponent} from "./pages/clients/client-profile/client-profile.component";
import {AppService} from "./app.service";
import {BasicAuthInterceptor} from "./services/basic-auth.interceptor";
import {ErrorInterceptor} from "./services/error.interceptor";
import {AuthenticationService} from "./services/authentication.service";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./pages/login/login.component";
import {AdvisorService} from "./services/advisor.service";
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {AccordionConfig, AccordionModule} from "ngx-bootstrap/accordion";
import {AdminComponent} from "./pages/admin/admin.component";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ClientsComponent,
    GoalsComponent,
    NavigationComponent,
    ClientGridComponent,
    ClientProfileComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    ModalModule,
    AccordionModule.forRoot(),
  ],
  providers: [
    ProjectService,
    ClientRequestService,
    AuthenticationService,
    AdvisorService,
    AppService,
    BsModalService,
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: AccordionConfig, useValue: {closeOthers: true}},
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
