import {Injectable} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AddProjectModalComponent} from "./add-project-modal.component";

@Injectable()
export class AddProjectModalService {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService){}

  openModal(nextId: number, goalValue?: string){
    this.modalRef = this.modalService.show(AddProjectModalComponent);
    this.modalRef.content.nextId = nextId
    this.modalRef.content.goalValue = goalValue
  }

  closeModal(){
    this.modalRef.hide()
  }
}
