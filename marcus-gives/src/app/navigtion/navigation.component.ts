import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'navigation-bar-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navItems: {name: string, link: string}[];
  loggedIn: boolean;
  subscriptions = new Subscription();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    console.log('[NavigationComponent] onInit')
    this.subscriptions.add(this.authenticationService.getLoggedInState().subscribe((value) => {
      this.loggedIn = value;
    }))
      this.navItems = [
        {name: 'Goals',
          link: 'goals'},
        {name: 'Projects',
          link: 'projects'},
        {name: 'Clients',
          link: 'clients'}
      ]
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loginLogout(): void {
    this.router.navigate(['login']);
  }
}
