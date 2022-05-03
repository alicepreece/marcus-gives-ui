import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, map} from "rxjs/operators";
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";
import {UpdateProjectModalService} from "./update-project-modal.service";
import {Subscription} from "rxjs";
import {RegionEnum, RegionEnumList} from "../../models/region.enum";
import {GoalEnumList} from "src/app/models/goal.enum";
import {Strategy, StrategyEnumList} from "../../models/strategy.enum";
import {Scores} from "../../models/scores.model";
import {FeesEnum} from "../../models/fees.enum";

@Component({
  selector: 'add-project-modal-component',
  templateUrl: './update-project-modal.component.html',
  styleUrls: ['./update-project-modal.component.scss']
})
export class UpdateProjectModalComponent implements OnInit, OnDestroy {
  nextId: number;
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
              private addProjectModalService: UpdateProjectModalService){}

  ngOnInit() {
    console.log('[LoginComponent] onInit')
    this.nextId = this.addProjectModalService.nextId
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
    this.findStrategy()
    let regions: RegionEnum[] = [];
    regions.push(this.form['region'].value)
    const scores: Scores = {
      id: this.nextId,
      socialOverEnv: this.form['socialOverEnv'].value !== 'False',
      povertyOverEducation: this.form['povOverEd'].value !== 'False',
      economyOverHealthcare: this.form['econOverHealth'].value !== 'False',
      targetedOverDiverse: this.targeted,
      esgOverAll: this.esg,
      shortOverLongTerm: this.form['shortOverLong'].value !== 'False',
      managementFees: this.form['fees'].value > 0 ? FeesEnum.NONE : (this.form['fees'].value > 5 ? FeesEnum.OVER5 : FeesEnum.UNDER5),
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
        this.closeModal();
        return;
      })).subscribe());
  }

  closeModal(){
    this.addProjectModalService.closeModal();

  }

  findStrategy(): void {
    switch(this.form['strategy'].value) {
      case Strategy.GLOBALSTRATEGY:
        this.targeted = false
        this.esg = false
        return;
      case Strategy.GLOBALESG:
        this.targeted = false
        this.esg = true
        return;
      case Strategy.GNEQALL:
        this.targeted = true
        this.esg = false
        return;
      case Strategy.GNEQESG:
        this.targeted = true
        this.esg = true
        return;
      case Strategy.ESGNEM:
        this.targeted = true
        this.esg = true
        return;
      case Strategy.ESGNDE:
        this.targeted = true
        this.esg = true
        return;
      case Strategy.EQESGACT:
        this.targeted = true
        this.esg = true
        return;
      case Strategy.EQACT:
        this.targeted = true
        this.esg = false
        return;
      case Strategy.BONDALL:
        this.targeted = true
        this.esg = false
        return;
      default:
        this.targeted = true
        this.esg = false
        return;
    }
  }
}
