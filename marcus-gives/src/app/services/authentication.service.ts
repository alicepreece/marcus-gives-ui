import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';


import {environment} from "../../environments/environment";
import {User} from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private loggedIn: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!)?.user || null);
    this.user = this.userSubject.asObservable();
    if (localStorage.getItem('user')) {
      this.loggedIn = new BehaviorSubject<boolean>(true);
    } else {
      this.loggedIn = new BehaviorSubject<boolean>(false);
    }
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.post<any>(`${environment.baseUrl}/authenticate`, { username, password }, {headers: headers}).pipe(
        map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user.user);
        this.loggedIn.next(true);
        return user;
      }));
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.loggedIn.next(false);
    this.router.navigate(['login']);
  }

  getLoggedInState(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
