import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Client} from "../models/client.model";

@Injectable()
export class ClientService {
  baseUrl = environment.baseUrl;
  clientsUrl = `${this.baseUrl}/clients`

  constructor(private http: HttpClient) {
  }

  getClients() {
    return this.http.get<Client[]>(this.clientsUrl);
  }
}
