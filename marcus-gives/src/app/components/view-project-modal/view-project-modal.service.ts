import {Component, Injectable} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ViewProjectModalComponent} from "./view-project-modal.component";
import {Project} from "../../models/project.model";

@Injectable()
export class ViewProjectModalService {
  modalRef: BsModalRef;
  project: Project;
  advisor: boolean;

  constructor(private modalService: BsModalService){}

  openModal(){
    this.modalRef = this.modalService.show(ViewProjectModalComponent)
  }

  closeModal(){
    this.modalRef.hide();
  }
}
