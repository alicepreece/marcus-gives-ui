import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";
import {map, Observable, Subscription} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {RoleEnum} from "../../models/role.enum";
import {ViewProjectModalService} from "../../components/view-project-modal/view-project-modal.service";
import {AddProjectModalService} from "../../components/add-project-modal/add-project-modal.service";
import {Client} from "../../models/client.model";
import {ClientRequestService} from "../../services/client-request.service";
import {RegionEnum} from "../../models/region.enum";

@Component({
  selector: 'projects-page-component',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Observable<Project[]>;
  isAdvisor: boolean = false;
  nextProjectId: number;
  filters?: Map<string, string>;
  title: string;
  client: Client;
  subscriptions = new Subscription();

  constructor(private projectService: ProjectService,
              private authenticationService: AuthenticationService,
              private viewProjectModalService: ViewProjectModalService,
              private addProjectModalService: AddProjectModalService,
              private clientService: ClientRequestService) {
  }

  ngOnInit() {
    console.log('[ProjectsComponent] onInit')
    this.filters = this.projectService.filters
    this.projects = this.projectService.getProjects().pipe(
      map(projects => {
        let highestId = 0;
        projects.forEach(project => {
          if (project.id > highestId) {
            highestId = project.id
          }
        })
        this.nextProjectId = highestId + 1;
        if (this.filters) {
          if ( this.filters.keys().next().value === 'region') {
            this.title = 'Projects targeting: ' + this.filters.get('region') + ' and ' + this.filters.get('goal');
            if (this.filters.get('region') === 'Americas') {
              projects = projects.filter(project => {
                return (project.region === RegionEnum.NAMERICA || project.region === RegionEnum.SAMERICA) && project.goal === this.filters!.get('goal')
              })
            } else if (this.filters.get('region') === 'EMEA') {
              projects = projects.filter(project => {
                return (project.region === RegionEnum.AFRICA || project.region === RegionEnum.MEAST || project.region === RegionEnum.EUROPE) && project.goal === this.filters!.get('goal')
              })
            } else if (this.filters.get('region') === 'APAC') {
              projects = projects.filter(project => {
                return (project.region === RegionEnum.CANDSASIA || project.region === RegionEnum.EANDSEASIA || project.region === RegionEnum.OCEANIA) && project.goal === this.filters!.get('goal')
              })
            }
          } else {
            this.title = 'Projects targeting: ' + this.filters.get('goal')
            projects = projects.filter(project => {
              return project.goal === this.filters!.get('goal')
            })
          }
        } else {
          this.title = 'All Projects'
        }
        return projects;
      })
    );
    const user = this.authenticationService.userValue;
    if (user?.role == RoleEnum.ADVISOR) {
      this.isAdvisor = true;
    } else {
      if (user) {
        this.subscriptions.add(this.clientService.getClientFromUsername(user!.username).pipe(
          map((client: Client) => {
            this.client = client;
          })
        ).subscribe());
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openAddModal(): void {
    this.addProjectModalService.openModal(this.nextProjectId);
  }

  openViewModal(project: Project): void {
    console.log(this.client);
    this.viewProjectModalService.project = project;
    this.viewProjectModalService.isAdvisor = this.isAdvisor;
    this.viewProjectModalService.client = this.client;
    this.viewProjectModalService.openModal();
  }

  resetFilters(): void {
    this.projectService.filters = undefined;
    this.ngOnInit();
  }
}
