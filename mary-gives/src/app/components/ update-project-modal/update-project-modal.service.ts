import {Injectable} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {UpdateProjectModalComponent} from "./update-project-modal.component";
import {Project} from "../../models/project.model";

@Injectable()
export class UpdateProjectModalService {
  modalRef: BsModalRef;
  nextId: number;
  currentProject: Project;

  constructor(private modalService: BsModalService){}

  openModal(){
    this.modalRef = this.modalService.show(UpdateProjectModalComponent);
  }

  closeModal(){
    this.modalRef.hide()
  }
}
