import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "../models/project.model";
import {environment} from "../../environments/environment";
import {catchError, Observable} from "rxjs";

@Injectable()
export class ProjectService {
  baseUrl = environment.baseUrl;
  projectsUrl = `${this.baseUrl}/projects`;
  addProjectsUrl = `${this.baseUrl}/addProjects`;
  token: string;

  constructor(private http: HttpClient) {
  }

  getProjects() {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<Project[]>(this.projectsUrl, { headers: headers});
  }

  addProjects(): Observable<any> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.post<any>(this.addProjectsUrl, {id: '123', task: 'addProjects'}, {
      headers: headers
    }).pipe(
      catchError((error) => {
        console.log('Add projects failed with error', error);
        throw error;
      }));
  }

  getProject(id: number): Observable<Project> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.get<Project>( `${this.baseUrl}/project/${id}`, { headers: headers});
  }

  addProject(project: Project): Observable<Project> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.post<Project>(`${this.baseUrl}/addProject`, {headers: headers});
  }
}
