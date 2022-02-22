import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";
import {Observable} from "rxjs";

@Component({
  selector: 'projects-page-component',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Observable<Project[]>;
  boolean = false;
  currentProject: Project = new Project();

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    console.log('[ProjectsComponent] onInit')
    this.projects = this.projectService.getProjects();
  }

  setProjectId(project: Project): void {
    this.currentProject = project;
  }
}
