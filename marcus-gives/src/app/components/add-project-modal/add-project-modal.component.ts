import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'add-project-modal-component',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent {
  addProjectForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string | undefined;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router){}

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

  get form() { return this.addProjectForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.addProjectForm.invalid) {
      return;
    }
    this.loading = true;
    const project = {
      id: 8,
      name: this.form['name'].value,
      total: this.form['total'].value,
      region: this.form['region'].value,
      aims: this.form['aims'].value,
      strategy: this.form['strategy'].value
    }
    this.projectService.addProject(project).pipe(
      map(() => {
        return this.router.navigate(['projects'])
      })).subscribe();
  }
}
