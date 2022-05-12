import {Component, Injectable} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Client} from "../../models/client.model";
import {UpdatePreferencesModalComponent} from "./update-preferences-modal.component";

@Injectable()
export class UpdatePreferencesModalService {
  modalRef: BsModalRef;
  client: Client;

  constructor(private modalService: BsModalService){}

  open(){
    this.modalRef = this.modalService.show(UpdatePreferencesModalComponent)
  }

  closeModal(){
    this.modalRef.hide();
  }
}
