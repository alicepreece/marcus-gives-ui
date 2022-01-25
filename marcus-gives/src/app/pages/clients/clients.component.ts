import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/client.model";
import {map, Observable} from "rxjs";

@Component({
  selector: 'clients-page-component',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
  client: Observable<Client[]>;

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.client = this.clientService.getClients().pipe(map((client) => {
      return client;
    }));
  }
}
