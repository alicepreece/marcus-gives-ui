import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ColDef, RowClickedEvent} from 'ag-grid-community';
import {Client} from "../../../models/client.model";
import {map, Observable, Subscription} from "rxjs";
import {ClientRequestService} from "../../../services/client-request.service";
import {User} from "../../../models/user.model";
import {Advisor} from "../../../models/advisor.model";
import {AdvisorService} from "../../../services/advisor.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {ViewClientModalService} from "../../../components/view-client-modal/view-client-modal.service";

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
    { headerName: 'ID', field: 'id', width: 70 },
    { headerName: 'FirstName', field: 'user.firstName', width: 120 },
    { headerName: 'Surname', field: 'user.lastName', width: 120 },
    { headerName: 'Account Number', field: 'accountNumber', width: 120 },
    { headerName: 'No. Active Projects', field: 'donations', valueFormatter: this.formatCount, minWidth: 120},
    { headerName: 'Email', field: 'emailAddress', minWidth: 175},
    { headerName: 'Amount Available', field: 'investableAmount', minWidth: 120}
  ];

  gridOptions = {
    onRowClicked: (event: RowClickedEvent) =>
      this.openClientProfile(event)
  }

  constructor(private clientRequestService: ClientRequestService,
              private advisorService: AdvisorService,
              private viewClientModalService: ViewClientModalService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    console.log('[ClientGridComponent] init');
    if (this.authenticationService.userValue) {
      console.log('clientGridComponent', this.authenticationService.userValue);
      this.subscriptions.add(this.authenticationService.user.subscribe((user) => {
        console.log('user returned', user);
        this.advisorUser = user!;
        this.advisorService.getAdvisorFromUsername(this.advisorUser.username).subscribe((advisor) => {
          this.advisor = advisor;
          this.rowData$ = this.clientRequestService.getClients().pipe(
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

  formatCount(params: any): string {
    let arrayLength: number = 0;
    for (let value in params.value) {
      arrayLength += 1;
    }
    return arrayLength.toString();
  }

  closeOffcanvas(): void {
    const panel = document.getElementById("closeButton")
    panel!.click();
    this.ngOnInit();
  }

  openClientProfile(event: RowClickedEvent): void {
    this.viewClientModalService.client = event.data;
    this.viewClientModalService.openModal();
  }
}
