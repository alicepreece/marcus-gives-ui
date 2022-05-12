import {NgModule} from "@angular/core";
import {AddProjectModalComponent} from "./add-project-modal/add-project-modal.component";
import {UpdatePreferencesModalComponent} from "./update-preferences-modal/update-preferences-modal.component";
import {ViewProjectModalComponent} from "./view-project-modal/view-project-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ViewProjectModalService} from "./view-project-modal/view-project-modal.service";
import {AddProjectModalService} from "./add-project-modal/add-project-modal.service";
import {ViewClientModalComponent} from "./view-client-modal/view-client-modal.component";
import {ViewClientModalService} from "./view-client-modal/view-client-modal.service";
import {UpdateProjectModalComponent} from "./ update-project-modal/update-project-modal.component";
import {UpdateProjectModalService} from "./ update-project-modal/update-project-modal.service";
import {UpdatePreferencesModalService} from "./update-preferences-modal/update-preferences-modal.service";
import {ClientQuestionsComponent} from "./client-questions/client-questions.component";

@NgModule({
  declarations: [
    AddProjectModalComponent,
    UpdatePreferencesModalComponent,
    ViewProjectModalComponent,
    ViewClientModalComponent,
    UpdateProjectModalComponent,
    ClientQuestionsComponent,
  ],
  exports: [
    AddProjectModalComponent,
    UpdatePreferencesModalComponent,
    ViewProjectModalComponent,
    ClientQuestionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    ViewProjectModalService,
    AddProjectModalService,
    ViewClientModalService,
    UpdateProjectModalService,
    UpdatePreferencesModalService
  ]
})
export class ComponentsModule{}
