import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "../models/project.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Scores} from "../models/scores.model";
import {Client} from "../models/client.model";
import {DonationRequest} from "../models/donationRequest.model";
import * as moment from 'moment';
import {Donation} from "../models/donation.model";

@Injectable()
export class ProjectService {
  baseUrl = environment.baseUrl;
  filters: Map<string, string> | undefined;
  token: string;

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {
  }


  getProjects() {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`, { headers: this.headers});
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>( `${this.baseUrl}/project/${id}`, { headers: this.headers});
  }

  addProject(project: Project): Observable<any> {
    return this.http.post<Project>(`${this.baseUrl}/addProject`, project, { headers: this.headers});
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put<Project>(`${this.baseUrl}/updateProject/${project.id}`, project, { headers: this.headers})
  }

  donate(client: Client, project: Project, amount: string): Observable<any>{
    const request = new DonationRequest();
    request.clientId = client.id;
    request.projectId = project.id;
    request.amount = parseInt(amount);
    request.timestamp = moment().unix()
    return this.http.post<DonationRequest>(`${this.baseUrl}/donate`, request, {headers: this.headers});
  }

  cancelDonation(donation: Donation, client: Client): Observable<any> {
    const request = new DonationRequest();
    request.clientId = client.id;
    request.projectId = donation.project.id
    request.amount = donation.amount
    request.timestamp = donation.timestamp
    return this.http.post<DonationRequest>(`${this.baseUrl}/cancelDonation`, request, {headers: this.headers})
  }

  getScore(scoreId: string): Observable<Scores> {
    return this.http.get<Scores>(`${this.baseUrl}/score/${scoreId}`, { headers: this.headers});
  }
}
