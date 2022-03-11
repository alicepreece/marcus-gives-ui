import {Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Goal} from "../../models/goal.model";
import {AuthenticationService} from "../../services/authentication.service";

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
  sanitationUrl: SafeResourceUrl;
  healthUrl: SafeResourceUrl;
  inequalityUrl: SafeResourceUrl;
  goals: Goal[];

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    console.log('[GoalsComponent] onInit');
    this.noPovertyUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/share-of-population-in-extreme-poverty?country=BGD~BOL~MDG~IND~CHN~ETH~COD');
    this.equalEducationUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/net-enrolment-rate-pre-primary');
    this.environmentUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/forest-area-as-share-of-land-area');
    this.sanitationUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/explorers/water-and-sanitation?facet=none&Resource=Sanitation&Level+of+Access=Safely+managed&Residence=Total&Relative+to+population=Share+of+population&country=IND~USA~KEN~OWID_WRL~BGD~ZAF~CHN&hideControls=true');
    this.healthUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://ourworldindata.org/grapher/life-expectancy");
    this.inequalityUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://ourworldindata.org/grapher/economic-inequality-gini-index");
    this.currentUrl = this.noPovertyUrl;
    this.goals = [
      {key: 'poverty', displayName: 'No Poverty'},
      {key: 'education', displayName: 'Quality Education'},
      {key: 'environment', displayName: 'Protect the Environment'},
      {key: 'sanitation', displayName: 'Improve Sanitation'},
      {key: 'health', displayName: 'Health and Wellbeing'},
      {key: 'inequality', displayName: 'Equal Societies'}];
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
      case 'sanitation':
        this.currentUrl = this.sanitationUrl;
        break;
      case 'health':
        this.currentUrl = this.healthUrl;
        break;
      case 'inequality':
        this.currentUrl = this.inequalityUrl;
        break;
      default:
        this.currentUrl = this.noPovertyUrl;
        break;
    }
  }
}
