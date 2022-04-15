import {Component, OnInit} from "@angular/core";
import {Client} from "../../models/client.model";
import {ViewClientModalService} from "./view-client-modal.service";
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";
import {Donation} from "../../models/donation.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'view-client-modal-component',
  templateUrl: './view-client-modal.component.html',
  styleUrls: ['./view-client-modal.component.scss']
})
export class ViewClientModalComponent implements OnInit {
  client: Client;
  currentDonations: Project[] = [];
  pastDonations: Project[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private viewClientModalService: ViewClientModalService, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.client = this.viewClientModalService.client;
    this.client.donations?.forEach((donation: Donation) => {
      this.subscriptions.add(this.projectService.getProject(donation.project.id).subscribe(
        (project: Project) => {
          this.currentDonations.push(project);
          return project;
        }));
    })
    this.client.pastDonations?.forEach((donation: Donation) => {
      this.subscriptions.add(this.projectService.getProject(donation.project.id).subscribe(
        (project: Project) => {
          this.pastDonations.push(project);
          return project;
        }));
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeModal(){
    this.viewClientModalService.closeModal();
  }
}
