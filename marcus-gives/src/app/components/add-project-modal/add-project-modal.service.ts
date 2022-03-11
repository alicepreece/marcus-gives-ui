import {Component, Injectable} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AddProjectModalComponent} from "./add-project-modal.component";

@Injectable()
export class AddProjectModalService {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService){}

  openModal(){
    this.modalRef = this.modalService.show(AddProjectModalComponent);
  }

  closeModal(){
    this.modalRef.hide();
  }
}
