import {Component, OnInit} from "@angular/core";
import {Project} from "../../models/project.model";
import {ViewProjectModalService} from "./view-project-modal.service";
import {Client} from "../../models/client.model";
import {AuthenticationService} from "../../services/authentication.service";
import {ClientRequestService} from "../../services/client-request.service";
import {ProjectService} from "../../services/project.service";
import { includes } from "lodash";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Scores} from "../../models/scores.model";
import { GoalEnumList } from "src/app/models/goal.enum";
import {RegionEnum, RegionEnumList} from "src/app/models/region.enum";
import {StrategyEnumList} from "src/app/models/strategy.enum";
import {FeesEnum} from "../../models/fees.enum";
import StrategyUtils from "../strategy.utils";
import {Subscription} from "rxjs";

@Component({
  selector: 'view-project-modal-component',
  templateUrl: './view-project-modal.component.html',
  styleUrls: ['./view-project-modal.component.scss']
})
export class ViewProjectModalComponent implements OnInit {
  project: Project;
  isAdvisor: boolean;
  client: Client | undefined;
  donateForm: FormGroup;
  updateProjectForm: FormGroup;
  editProject: boolean;
  GoalEnumList = GoalEnumList;
  RegionEnumList = RegionEnumList;
  StrategyEnumList = StrategyEnumList;
  error: string;
  submitted: boolean;
  score: Scores;
  subscriptions: Subscription = new Subscription();

  constructor(
    private viewProjectModalService: ViewProjectModalService,
    private authenticationService: AuthenticationService,
    private clientService: ClientRequestService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.project = this.viewProjectModalService.project;
    this.isAdvisor = this.viewProjectModalService.isAdvisor;
    this.client = this.viewProjectModalService.client;
    this.donateForm = this.formBuilder.group({
      'amount': ['', Validators.required]
    })
    this.updateProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      goal: ['', Validators.required],
      region: [''],
      aims: [''],
      strategy: [''],
      fees: [''],
      socialOverEnv: [''],
      povOverEd: [''],
      econOverHealth: [''],
      shortOverLong: ['']
    })
    this.editProject = false;
  }

  ngOnChanges(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get form() { return this.donateForm.controls; }

  get updateForm() { return this.updateProjectForm.controls; }

  fieldArray(): String[] {
    return ["ID: ", "Name: ", "Total: ", "Region: ", "Goal: ", "Aims: ", "Strategy: ", "Management Fees: ", "Investors: "];
  }

  getValue(field: String): String {
    switch(field) {
      case 'ID: ':
        return this.project.id.toString();
      case 'Name: ':
        return this.project.name;
      case 'Total: ':
        return this.project.total!.toString();
      case 'Region: ':
        return this.project.region!;
      case 'Goal: ':
        return this.project.goal!;
      case 'Aims: ':
        return this.project.aims!;
      case 'Management Fees: ':
        return this.project.fees!;
      case 'Strategy: ':
        return this.project.strategy!;
      case 'Investors: ':
        return this.project.investors ? this.project.investors!.length.toString() : '0';
      default:
        return '';
    }
  }


  isClientProject(project: Project): boolean {
    let projects: number[] = [];
    if (this.client?.donations) {
      this.client?.donations.forEach(donation => projects.push(donation.project.id));
    }
    return includes(projects, project.id);
  }

  onSubmitDonation(project: Project): void {
    if (this.client) {
      const amount = this.form['amount'].value
      const projectRequest = {
        id: project.id,
        name: project.name,
        goal: project.goal,
        total: project.total,
        region: project.region,
        aims: project.aims,
        strategy: project.strategy,
        fees: project.fees,
        investors: project.investors || [],
        scores: project.scores
      }
      this.subscriptions.add(this.projectService.donate(this.client, projectRequest, amount).subscribe(() => {
        this.closeModal();
      }));
    }
  }

  cancelDonation(project: Project): void {
    if (this.client) {
      const donation = this.client.donations.filter(donation => donation.project.id == project.id)
      this.subscriptions.add(this.projectService.cancelDonation(donation[0], this.client).subscribe(() => {
        this.closeModal();
      }));
    }
  }

  onSubmitUpdate(): void {
    if (!this.client) {
      let regions: RegionEnum[] = [];
      regions.push(this.updateForm['region'].value)
      const scores = {
        id: this.project.id,
        socialOverEnv: this.updateForm['socialOverEnv'].value !== 'False',
        povertyOverEducation: this.updateForm['povOverEd'].value !== 'False',
        economyOverHealthcare: this.updateForm['econOverHealth'].value !== 'False',
        targetedOverDiverse: StrategyUtils.findTargeted(this.updateForm['strategy'].value),
        esgOverAll: StrategyUtils.findESG(this.updateForm['strategy'].value),
        shortOverLongTerm: this.updateForm['shortOverLong'].value !== 'False',
        managementFees: parseInt(this.updateForm['fees'].value) > 0 ? (parseInt(this.updateForm['fees'].value) > 5 ? FeesEnum.OVER5 : FeesEnum.UNDER5) : FeesEnum.NONE,
        region: regions,
      }
      const updatedProject = {
        id: this.project.id,
        name: this.updateForm['name'].value,
        goal: this.updateForm['goal'].value,
        total: this.project.total,
        region: this.updateForm['region'].value,
        aims: this.updateForm['aims'].value,
        strategy: this.updateForm['strategy'].value,
        fees: this.updateForm['fees'].value,
        scores: scores
      }
      this.subscriptions.add(this.projectService.updateProject(updatedProject).subscribe(() => {
        this.closeModal();
      }));
    }
  }

  closeModal(){
    this.viewProjectModalService.closeModal();
  }
}
