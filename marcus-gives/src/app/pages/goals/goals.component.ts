import {Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {GoalEnum, GoalEnumList} from "../../models/goal.enum";
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";
import {AddProjectModalService} from "../../components/add-project-modal/add-project-modal.service";
import {map, Subscription} from "rxjs";

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
  goals: { key: string, value: string }[];
  nextProjectId: number;
  selectedGoal: string = 'No Poverty';
  subscriptions: Subscription = new Subscription();

  constructor(
    private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private router: Router,
    private addProjectModalService: AddProjectModalService) {
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
    this.goals = GoalEnumList;
    this.subscriptions.add(this.projectService.getProjects().pipe(
      map(projects => {
        let highestId = 0;
        projects.forEach(project => {
          if (project.id > highestId) {
            highestId = project.id
          }
        })
        this.nextProjectId = highestId + 1;
      })).subscribe())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSelectGoal(goal: string): void {
    console.log('[GoalsComponent] onSelectGoal, ' + goal)
    this.selectedGoal = goal;
    switch (goal) {
      case GoalEnum.EDUCATION:
        this.currentUrl = this.equalEducationUrl;
        break;
      case GoalEnum.ENVIRONMENT:
        this.currentUrl = this.environmentUrl;
        break;
      case GoalEnum.SANITATION:
        this.currentUrl = this.sanitationUrl;
        break;
      case GoalEnum.HEALTH:
        this.currentUrl = this.healthUrl;
        break;
      case GoalEnum.INEQUALITY:
        this.currentUrl = this.inequalityUrl;
        break;
      default:
        this.currentUrl = this.noPovertyUrl;
        break;
    }
  }

  onViewProjects(goal: string): void {
    const filters = new Map<string, string>();
    filters.set('goal', goal)
    this.projectService.filters = filters;
    this.router.navigateByUrl('projects');
  }

  onCreateRelatedProject(goal: string): void {
    this.addProjectModalService.openModal(this.nextProjectId, goal);
  }

  onAmericasMapClick(): void {
    const filters = new Map<string, string>();
    filters.set('region', 'Americas');
    filters.set('goal', this.selectedGoal);
    this.projectService.filters = filters;
    this.router.navigateByUrl('projects');
  }

  onEmeaMapClick(): void {
    const filters = new Map<string, string>();
    filters.set('region', 'EMEA');
    filters.set('goal', this.selectedGoal);
    this.projectService.filters = filters;
    this.router.navigateByUrl('projects');
  }

  onApacMapClick(): void {
    const filters = new Map<string, string>();
    filters.set('region', 'APAC');
    filters.set('goal', this.selectedGoal);
    this.projectService.filters = filters;
    this.router.navigateByUrl('projects');
  }

}
