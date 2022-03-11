import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {RoleEnum} from "../models/role.enum";

@Component({
  selector: 'navigation-bar-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navItems: {name: string, link: string}[];
  loggedIn: boolean;
  advisor: boolean;
  subscriptions = new Subscription();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    console.log('[NavigationComponent] onInit')
    this.subscriptions.add(this.authenticationService.getLoggedInState().subscribe((value) => {
      this.loggedIn = value;
      if (value) {
        this.advisor = this.authenticationService.userValue!.role === RoleEnum.ADVISOR;
        this.navItems = [
          {
            name: 'Goals',
            link: 'goals'
          },
          {
            name: 'Projects',
            link: 'projects'
          },
          {
            name: this.advisor ? 'My Clients' : 'My Account',
            link: 'clients'
          },
        ]
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loginLogout(): void {
    this.router.navigate(['login']);
  }
}
