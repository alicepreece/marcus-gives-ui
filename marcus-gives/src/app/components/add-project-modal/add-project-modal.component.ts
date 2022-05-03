import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { map} from "rxjs/operators";
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";
import {AddProjectModalService} from "./add-project-modal.service";
import {Subscription} from "rxjs";
import {RegionEnum, RegionEnumList} from "../../models/region.enum";
import {GoalEnum, GoalEnumList} from "src/app/models/goal.enum";
import {StrategyEnumList} from "../../models/strategy.enum";
import {Scores} from "../../models/scores.model";
import {FeesEnum} from "../../models/fees.enum";
import StrategyUtils from "../strategy.utils";

@Component({
  selector: 'add-project-modal-component',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent implements OnInit, OnDestroy {
  nextId: number;
  goalValue: string | undefined;
  addProjectForm: FormGroup;
  submitted = false;
  error: string | undefined;
  subscriptions: Subscription = new Subscription();
  GoalEnumList = GoalEnumList;
  RegionEnumList = RegionEnumList;
  StrategyEnumList = StrategyEnumList;
  targeted: boolean;
  esg: boolean;
  prePopulatedGoal: string;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router,
              private addProjectModalService: AddProjectModalService){}

  ngOnInit() {
    console.log('[LoginComponent] onInit')
    this.addProjectForm = this.formBuilder.group({
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
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get form() { return this.addProjectForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addProjectForm.invalid) {
      return;
    }
    let regions: RegionEnum[] = [];
    regions.push(this.form['region'].value)
    const scores: Scores = {
      id: this.nextId,
      socialOverEnv: this.form['socialOverEnv'].value !== 'False',
      povertyOverEducation: this.form['povOverEd'].value !== 'False',
      economyOverHealthcare: this.form['econOverHealth'].value !== 'False',
      targetedOverDiverse: StrategyUtils.findTargeted(this.form['strategy'].value),
      esgOverAll: StrategyUtils.findESG(this.form['strategy'].value),
      shortOverLongTerm: this.form['shortOverLong'].value !== 'False',
      managementFees: this.form['fees'].value > 0 ? (this.form['fees'].value > 5 ? FeesEnum.OVER5 : FeesEnum.UNDER5) : FeesEnum.NONE,
      region: regions,
    }
    const project = {
      id: this.nextId,
      name: this.form['name'].value,
      goal: this.form['goal'].value,
      total: 0,
      region: this.form['region'].value,
      aims: this.form['aims'].value,
      strategy: this.form['strategy'].value,
      managementFees: this.form['fees'].value,
      scores: scores
    }
    this.subscriptions.add(this.projectService.addProject(project).pipe(
      map((response) => {
        if (response) {
          this.closeModal();
        }
      })).subscribe());
  }

  closeModal(){
    this.addProjectModalService.closeModal();
  }
}
