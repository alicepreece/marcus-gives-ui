import {ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoalsComponent} from "./pages/goals/goals.component";
import {ProjectsComponent} from "./pages/projects/projects.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  {path: 'goals', component: GoalsComponent, canActivate: [AuthGuard]},
  {path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
