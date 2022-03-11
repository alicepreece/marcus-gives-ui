import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, map} from "rxjs/operators";
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";
import {AddProjectModalService} from "./add-project-modal.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'add-project-modal-component',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  addProjectForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string | undefined;
  subscriptions: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router,
              private addProjectModalService: AddProjectModalService){}

  ngOnInit() {
    console.log('[LoginComponent] onInit')
    this.addProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      total: ['', Validators.required],
      region: [''],
      aims: [''],
      strategy: ['']
    });
    this.returnUrl = '/projects';
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
    this.loading = true;
    const project = {
      id: this.id,
      name: this.form['name'].value,
      total: this.form['total'].value,
      region: this.form['region'].value,
      aims: this.form['aims'].value,
      strategy: this.form['strategy'].value
    }
    console.log('Project', project);
    this.subscriptions.add(this.projectService.addProject(project).pipe(
      map(() => {
        const element = document.getElementById("closeModal")
        element!.click();
        this.router.navigate(['projects']);
        return;
      }),
      catchError((error: any) => {
        this.error = error;
        throw error;
      })).subscribe());
    this.addProjectForm.reset();
  }

  closeModal(){
    this.addProjectModalService.closeModal();
  }
}
