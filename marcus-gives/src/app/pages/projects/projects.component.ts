import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";
import {map, Observable} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {RoleEnum} from "../../models/role.enum";
import {ViewProjectModalService} from "../../components/view-project-modal/view-project-modal.service";
import {AddProjectModalService} from "../../components/add-project-modal/add-project-modal.service";

@Component({
  selector: 'projects-page-component',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Observable<Project[]>;
  advisor: boolean = false;
  nextProjectId: number;

  constructor(private projectService: ProjectService,
              private authenticationService: AuthenticationService,
              private viewProjectModalService: ViewProjectModalService,
              private addProjectModalService: AddProjectModalService) {
  }

  ngOnInit() {
    console.log('[ProjectsComponent] onInit')
    this.projects = this.projectService.getProjects().pipe(
      map(projects => {
        let highestId = 0;
        projects.forEach(project => {
          if (project.id > highestId) {
            highestId = project.id
          }
        })
        this.nextProjectId = highestId + 1;
        return projects;
      })
    );
    const user = this.authenticationService.userValue;
    if (user?.role == RoleEnum.ADVISOR) {
      this.advisor = true;
    }
  }

  openAddModal(): void {
    this.addProjectModalService.openModal();
  }

  openViewModal(project: Project): void {
    this.viewProjectModalService.project = project;
    this.viewProjectModalService.advisor = this.advisor;
    this.viewProjectModalService.openModal();
  }
}
