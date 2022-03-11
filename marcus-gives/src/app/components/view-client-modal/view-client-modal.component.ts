import {Component, OnInit} from "@angular/core";
import {Client} from "../../models/client.model";
import {ViewClientModalService} from "./view-client-modal.service";
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'view-client-modal-component',
  templateUrl: './view-client-modal.component.html',
  styleUrls: ['./view-client-modal.component.scss']
})
export class ViewClientModalComponent implements OnInit {
  client: Client;
  currentProjects: Project[] = [];
  pastProjects: Project[] = [];

  constructor(private viewClientModalService: ViewClientModalService, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.client = this.viewClientModalService.client;
    this.client.projects.forEach((project: number) => {
      this.projectService.getProject(project).subscribe(
        (project: Project) => {
          this.currentProjects.push(project);
          return project;
        });
    })
    this.client.pastProjects.forEach((project: number) => {
      this.projectService.getProject(project).subscribe(
        (project: Project) => {
          this.pastProjects.push(project);
          return project;
        });
    })
  }

  closeModal(){
    this.viewClientModalService.closeModal();
  }
}
