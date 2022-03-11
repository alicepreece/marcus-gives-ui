import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Client} from "../models/client.model";
import {catchError, Observable} from "rxjs";

@Injectable()
export class ClientRequestService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getClients(): Observable<Client[]>{
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<Client[]>(`${this.baseUrl}/clients`, {
      headers: headers
    }).pipe(
      catchError((error) => {
        console.log('Find clients failed with error', error);
        throw error;
      }));
  }

  getClient(clientId: number): Observable<Client> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<Client>(`${this.baseUrl}/client/${clientId}`, {
      headers: headers
    }).pipe(
      catchError((error) => {
        console.log('Find client failed with error', error);
        throw error;
      }));
  }

  getClientFromUsername(clientUsername: string): Observable<Client> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<Client>(`${this.baseUrl}/client/username/${clientUsername}`, {
      headers: headers
    }).pipe(
      catchError((error) => {
        console.log('Find client failed with error', error);
        throw error;
      }));
  }

  createClient(client: Client): Observable<Client> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.post<Client>(`${this.baseUrl}/addClient`, client, {
      headers: headers
    })
  }
}
