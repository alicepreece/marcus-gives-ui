import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'client-grid-component',
  templateUrl: './client-grid.component.html',
  styleUrls: [ './client-grid.component.scss' ]
})
export class ClientGridComponent  {

  columnDefs: ColDef[] = [
    { field: 'Client ID' },
    { field: 'First Name' },
    { field: 'Surname' },
    { field: 'Account Number' },
    { field: 'Number of Active Projects' }
  ];

  rowData = [

  ];
  constructor() {
  }

  ngOnInit(): void {

  }
}
