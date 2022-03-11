import {NgModule} from "@angular/core";
import {AddProjectModalComponent} from "./add-project-modal/add-project-modal.component";
import {ClientPreferenceModalComponent} from "./client-preference-modal/client-preference-modal.component";
import {ViewProjectModalComponent} from "./view-project-modal/view-project-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ViewProjectModalService} from "./view-project-modal/view-project-modal.service";
import {AddProjectModalService} from "./add-project-modal/add-project-modal.service";
import {ViewClientModalComponent} from "./view-client-modal/view-client-modal.component";
import {ViewClientModalService} from "./view-client-modal/view-client-modal.service";

@NgModule({
  declarations: [
    AddProjectModalComponent,
    ClientPreferenceModalComponent,
    ViewProjectModalComponent,
    ViewClientModalComponent
  ],
  exports: [
    AddProjectModalComponent,
    ClientPreferenceModalComponent,
    ViewProjectModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    ViewProjectModalService,
    AddProjectModalService,
    ViewClientModalService
  ]
})
export class ComponentsModule{}
