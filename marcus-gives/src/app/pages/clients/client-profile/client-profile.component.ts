import {Component, Input, OnInit} from "@angular/core";
import {Client} from "../../../models/client.model";
import {map, Observable, Subscription} from "rxjs";
import {ClientRequestService} from "../../../services/client-request.service";
import {Project} from "../../../models/project.model";
import {ProjectService} from "../../../services/project.service";
import {User} from "../../../models/user.model";
import {AuthenticationService} from "../../../services/authentication.service";
import {Donation} from "../../../models/donation.model";
import {UpdatePreferencesModalService} from "../../../components/update-preferences-modal/update-preferences-modal.service";

@Component({
  selector: 'client-profile-component',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  clientUser: User;
  client: Client;
  currentProjects: Project[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private clientRequestService: ClientRequestService,
              private authenticationService: AuthenticationService,
              private updatePreferencesModalService: UpdatePreferencesModalService) {
  }

  ngOnInit(): void {
    console.log('[ClientProfileComponent] init');
    if (this.authenticationService.userValue) {
      this.clientUser = this.authenticationService.userValue!;
      this.subscriptions.add(this.clientRequestService.getClientFromUsername(this.clientUser.username).pipe(
        map((client: Client) => {
          this.client = client;
          if (!this.client.pastDonations) {
            this.client.pastDonations = []
          }
          if (!this.client.donations) {
            this.client.donations = []
          }
          if(client.donations) {
            client.donations.forEach((donation: Donation) => {
              this.currentProjects.push(donation.project);
            });
          }
          console.log("client", client);
          return client;
        })
      ).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  openUpdatePreferencesModal(): void {
    this.updatePreferencesModalService.client = this.client;
    this.updatePreferencesModalService.open();
  }
}
