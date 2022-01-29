import {Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Goal} from "../../models/goal.model";

@Component({
  selector: 'goals-page-component',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  currentUrl: SafeResourceUrl;
  noPovertyUrl: SafeResourceUrl;
  equalEducationUrl: SafeResourceUrl;
  environmentUrl: SafeResourceUrl;
  goals: Goal[];

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    console.log('[GoalsComponent] onInit');
    this.noPovertyUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/share-of-population-in-extreme-poverty?country=BGD~BOL~MDG~IND~CHN~ETH~COD');
    this.equalEducationUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/net-enrolment-rate-pre-primary');
    this.environmentUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/forest-area-as-share-of-land-area');
    this.currentUrl = this.noPovertyUrl;
    this.goals = [
      {key: 'poverty', displayName: 'No Poverty'},
      {key: 'education', displayName: 'Quality Education'},
      {key: 'environment', displayName: 'Protect the Environment'}];
  }

  onSelectGoal(goal: Goal): void {
    console.log('[GoalsComponent] onSelectGoal, ' + goal)
    switch (goal.key) {
      case 'education':
        this.currentUrl = this.equalEducationUrl;
        break;
      case 'environment':
        this.currentUrl = this.environmentUrl;
        break;
      default:
        this.currentUrl = this.noPovertyUrl;
        break;
    }
  }
}
