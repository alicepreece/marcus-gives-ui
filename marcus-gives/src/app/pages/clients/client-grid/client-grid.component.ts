import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {Client} from "../../../models/client.model";
import {map, Observable, Subscription} from "rxjs";
import {ClientService} from "../../../services/client.service";
import {User} from "../../../models/user.model";
import {Advisor} from "../../../models/advisor.model";
import {AdvisorService} from "../../../services/advisor.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'client-grid-component',
  templateUrl: './client-grid.component.html',
  styleUrls: [ './client-grid.component.scss' ]
})
export class ClientGridComponent implements OnInit, OnDestroy {
  advisorUser: User;
  subscriptions: Subscription = new Subscription();
  rowData$: Observable<Client[]>
  advisor: Advisor;

  columnDefs: ColDef[] = [
    { headerName: 'Client ID', field: 'id' },
    { headerName: 'FirstName', field: 'user.firstName' },
    { headerName: 'Surname', field: 'user.lastName' },
    { headerName: 'Account Number', field: 'accountNumber' },
    { headerName: 'Active Projects', field: 'projects', valueFormatter: this.formatList}
  ];

  constructor(private clientService: ClientService,
              private advisorService: AdvisorService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    console.log('[ClientGridComponent] init');
    if (this.authenticationService.userValue) {
      console.log('clientgridcomponent', this.authenticationService.userValue);
      this.subscriptions.add(this.authenticationService.user.subscribe((user) => {
        this.advisorUser = user!;
        this.advisorService.getAdvisorFromUsername(this.advisorUser.username).subscribe((advisor) => {
          this.advisor = advisor;
          this.rowData$ = this.clientService.getClients().pipe(
            map((clients: Client[]) => {
                return clients.filter((client) => client.advisorTeam === this.advisor.team);
              }
            )
          );
        })
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  formatList(params: any): string {
    let returnString: string = '';
    for (let value in params.value) {
      returnString += `${value} `
    }
    return returnString;
  }
}
