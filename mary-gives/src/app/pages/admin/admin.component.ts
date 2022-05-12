import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {AdvisorService} from "../../services/advisor.service";
import {Advisor} from "../../models/advisor.model";
import {RoleEnum} from "../../models/role.enum";
import {User} from "../../models/user.model";


@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  createAdvisorForm: FormGroup;
  loading = false;
  submitted = false;
  error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private advisorService: AdvisorService
  ) {
  }

  ngOnInit() {
    console.log('[AdminComponent] onInit')
    this.createAdvisorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      team: ['', Validators.required]
    });
  }

  get form() { return this.createAdvisorForm.controls; }

  formIncomplete(): boolean {
    return this.createAdvisorForm.invalid
  }

  onSubmit() {
    this.submitted = true;

    if (this.createAdvisorForm.invalid) {
      return;
    }
    const advisor: Advisor = this.createAdvisorObject();
    this.advisorService.createAdvisor(advisor).pipe(
      map(() => {
        return this.router.navigate(['goals'])
      }),
      catchError((error) => {
        this.error = error;
        this.createAdvisorForm.reset();
        throw error;
      })).subscribe();
  }

  createAdvisorObject(): Advisor {
    let advisor: Advisor = new Advisor();
    advisor.user = new User();
    advisor.id = 0;
    advisor.user.firstName = this.form['firstName'].value
    advisor.user.lastName = this.form['lastName'].value
    advisor.user.username = advisor.user.firstName[0].toLowerCase() + advisor.user.lastName.toLowerCase();
    advisor.user.password = advisor.user.firstName[0].toLowerCase() + advisor.user.lastName[0].toLowerCase() + '!password';
    advisor.user.role = RoleEnum.ADVISOR
    advisor.team = this.form['team'].value
    return advisor;
  }
}
