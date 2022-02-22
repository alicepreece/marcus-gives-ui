import {Component, Input} from "@angular/core";
import {Project} from "../../models/project.model";

@Component({
  selector: 'view-project-modal-component',
  templateUrl: './view-project-modal.component.html',
  styleUrls: ['./view-project-modal.component.scss']
})
export class ViewProjectModalComponent {
  @Input() project: Project;

  constructor() {
  }

}
