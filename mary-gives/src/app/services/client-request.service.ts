import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Client} from "../models/client.model";
import {catchError, Observable} from "rxjs";

@Injectable()
export class ClientRequestService {
  baseUrl = environment.baseUrl;
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {
  }

  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.baseUrl}/clients`, {
      headers: this.headers
    }).pipe(
      catchError((error) => {
        console.log('Find clients failed with error', error);
        throw error;
      }));
  }

  getClient(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/client/${clientId}`, {
      headers: this.headers
    }).pipe(
      catchError((error) => {
        console.log('Find client failed with error', error);
        throw error;
      }));
  }

  getClientFromUsername(clientUsername: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/client/username/${clientUsername}`, {
      headers: this.headers
    }).pipe(
      catchError((error) => {
        console.log('Find client failed with error', error);
        throw error;
      }));
  }

  createClient(client: Client): Observable<any> {
    return this.http.post<Client>(`${this.baseUrl}/addClient`, client, {
      headers: this.headers
    })
  }

  updateClient(client: Client): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateClient/${client.id}`, client, {
      headers: this.headers
    })
  }
}
