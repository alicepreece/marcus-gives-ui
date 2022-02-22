import {Component, Input, OnInit} from "@angular/core";
import {Client} from "../../../models/client.model";
import {map, Observable, Subscription} from "rxjs";
import {ClientService} from "../../../services/client.service";
import {Project} from "../../../models/project.model";
import {ProjectService} from "../../../services/project.service";
import {User} from "../../../models/user.model";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'client-profile-component',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  clientUser: User;
  client: Observable<Client>;
  currentProjects: Project[] = [];
  pastProjects: Project[] = [];

  constructor(private clientService: ClientService,
              private projectService: ProjectService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    console.log('[ClientProfileComponent] init');
    if (this.authenticationService.userValue) {
      this.clientUser = this.authenticationService.userValue!;
      this.client = this.clientService.getClientFromUsername(this.clientUser.username).pipe(
        map((client: Client) => {
          client.projects.forEach((project: number) => {
            this.projectService.getProject(project).subscribe(
              (project: Project) => {
                this.currentProjects.push(project);
                return project;
              });
          })
          client.pastProjects.forEach((project: number) => {
            this.projectService.getProject(project).subscribe(
              (project: Project) => {
                this.pastProjects.push(project);
                return project;
              });
          })
          console.log("client", client);
          return client;
        })
      );
    }
  }
}
