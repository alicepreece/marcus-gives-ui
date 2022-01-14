import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'goals-page-component',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit, SafeUrl {
  currentUrl: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/share-of-population-in-extreme-poverty?country=BGD~BOL~MDG~IND~CHN~ETH~COD');
  noPovertyUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/share-of-population-in-extreme-poverty?country=BGD~BOL~MDG~IND~CHN~ETH~COD');
  equalEducationUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/net-enrolment-rate-pre-primary');
  environmentUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/environment');
  // @ts-ignore
  goals: {key: string, displayName: string}[];
  // = [
  //   {key: 'poverty', displayName: 'No Poverty'},
  //   {key: 'education', displayName: 'Quality Education'},
  //   {key: 'environment', displayName: 'Protect the Environment'}];

  constructor(private sanitizer: DomSanitizer) {
    this.goals = [
      {key: 'poverty', displayName: 'No Poverty'},
      {key: 'education', displayName: 'Quality Education'},
      {key: 'environment', displayName: 'Protect the Environment'}];
  }

  ngOnInit(): void {
    console.log('[GoalsComponent] onInit');
  }

  onSelectGoal(goal: string): void {
    console.log('[GoalsComponent] onSelectGoal, ' + goal)
    switch (goal) {
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
