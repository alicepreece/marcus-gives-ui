import {ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoalsComponent} from "./pages/goals/goals.component";
import {ProjectsComponent} from "./pages/projects/projects.component";
import {ClientsComponent} from "./pages/clients/clients.component";

const routes: Routes = [
  {path: '', redirectTo: 'goals', pathMatch: 'full'},
  {path: 'goals', component: GoalsComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'clients', component: ClientsComponent},
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
