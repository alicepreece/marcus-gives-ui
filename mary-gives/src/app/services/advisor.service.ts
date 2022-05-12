import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Advisor} from "../models/advisor.model";

@Injectable()
export class AdvisorService {
  baseUrl = environment.baseUrl;
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')

  constructor(private http: HttpClient) {
  }

  getAdvisors(): Observable<Advisor[]>{
    return this.http.get<Advisor[]>(`${this.baseUrl}/advisors`, {
      headers: this.headers
    }).pipe(
      catchError((error) => {
        console.log('Find clients failed with error', error);
        throw error;
      }));
  }

  getAdvisorFromUsername(advisorUsername: string): Observable<Advisor> {
    return this.http.get<Advisor>(`${this.baseUrl}/advisor/username/${advisorUsername}`, {
      headers: this.headers
    }).pipe(
      catchError((error) => {
        console.log('Find advisor failed with error', error);
        throw error;
      }));
  }

  createAdvisor(advisor: Advisor): Observable<Advisor> {
    return this.http.post<Advisor>(`${this.baseUrl}/addAdvisor`, advisor, {
      headers: this.headers
    })
  }
}
