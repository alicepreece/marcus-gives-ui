import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Advisor} from "../models/advisor.model";

@Injectable()
export class AdvisorService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAdvisors(): Observable<Advisor[]>{
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<Advisor[]>(`${this.baseUrl}/advisors`, {
      headers: headers
    }).pipe(
      catchError((error) => {
        console.log('Find clients failed with error', error);
        throw error;
      }));
  }

  getClient(advisorId: number): Observable<Advisor> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<Advisor>(`${this.baseUrl}/advisor/${advisorId}`, {
      headers: headers
    }).pipe(
      catchError((error) => {
        console.log('Find client failed with error', error);
        throw error;
      }));
  }

  getAdvisorFromUsername(advisorUsername: string): Observable<Advisor> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<Advisor>(`${this.baseUrl}/advisor/username/${advisorUsername}`, {
      headers: headers
    }).pipe(
      catchError((error) => {
        console.log('Find client failed with error', error);
        throw error;
      }));
  }
}
