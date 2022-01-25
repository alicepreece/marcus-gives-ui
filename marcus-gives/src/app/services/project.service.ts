import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "../models/project.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class ProjectService {
  baseUrl = environment.baseUrl;
  projectsUrl = `${this.baseUrl}/projects`
  addProjectsUrl = `${this.baseUrl}/addProjects`

  constructor(private http: HttpClient) {
  }

  getProjects() {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  addProjects(): Observable<any> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(this.addProjectsUrl, {id: '123', task: 'addProjects'}, {
      headers: headers
    });
  }
}
