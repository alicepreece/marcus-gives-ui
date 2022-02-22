import {NgModule} from "@angular/core";
import {AddProjectModalComponent} from "./add-project-modal/add-project-modal.component";
import {ClientPreferenceModalComponent} from "./client-preference-modal/client-preference-modal.component";
import {ViewProjectModalComponent} from "./view-project-modal/view-project-modal.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AddProjectModalComponent,
    ClientPreferenceModalComponent,
    ViewProjectModalComponent
  ],
  exports: [
    AddProjectModalComponent,
    ClientPreferenceModalComponent,
    ViewProjectModalComponent
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class ComponentsModule{}
