import {Component, Input} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {Client} from "../../../models/client.model";
import { Observable} from "rxjs";
import {ClientService} from "../../../services/client.service";

@Component({
  selector: 'client-grid-component',
  templateUrl: './client-grid.component.html',
  styleUrls: [ './client-grid.component.scss' ]
})
export class ClientGridComponent  {
  rowData$: Observable<Client[]>

  columnDefs: ColDef[] = [
    { headerName: 'Client ID', field: 'id' },
    { headerName: 'FirstName', field: 'firstName' },
    { headerName: 'Surname', field: 'surname' },
    { headerName: 'Account Number', field: 'accountNumber' },
    { headerName: 'Active Projects', field: 'projects' }
  ];

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.rowData$ = this.clientService.getClients();
  }
}
