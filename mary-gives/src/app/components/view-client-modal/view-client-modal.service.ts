import {Component, Injectable} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Client} from "../../models/client.model";
import {ViewClientModalComponent} from "./view-client-modal.component";


@Injectable()
export class ViewClientModalService {
  modalRef: BsModalRef;
  client: Client;

  constructor(private modalService: BsModalService){}

  openModal(){
    this.modalRef = this.modalService.show(ViewClientModalComponent)
  }

  closeModal(){
    this.modalRef.hide();
  }
}
