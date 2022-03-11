import {Component, OnInit} from "@angular/core";
import {Project} from "../../models/project.model";
import {ViewProjectModalService} from "./view-project-modal.service";

@Component({
  selector: 'view-project-modal-component',
  templateUrl: './view-project-modal.component.html',
  styleUrls: ['./view-project-modal.component.scss']
})
export class ViewProjectModalComponent implements OnInit {
  project: Project;
  isAdvisor: boolean;

  constructor(private viewProjectModalService: ViewProjectModalService) {
  }

  ngOnInit(): void {
    console.log(this.project);
    this.project = this.viewProjectModalService.project;
    this.isAdvisor = this.viewProjectModalService.advisor;
  }

  fieldArray(): String[] {
    return ["ID: ", "Name: ", "Total: ", "Region: ", "Aims: ", "Strategy: ", "Investors: "];
  }

  getValue(field: String): String {
    switch(field) {
      case 'ID: ':
        return this.project.id.toString();
      case 'Name: ':
        return this.project.name;
      case 'Total: ':
        return this.project.total!.toString();
      case 'Region: ':
        return this.project.region!;
      case 'Aims: ':
        return this.project.aims!;
      case 'Strategy: ':
        return this.project.strategy!;
      case 'Investors: ':
        return this.project.investors ? this.project.investors!.length.toString() : '0';
      default:
        return '';
    }
  }

  donateToProject(): void {
    console.log('Add project to client project array');
  }

  closeModal(){
    this.viewProjectModalService.closeModal();
  }
}
