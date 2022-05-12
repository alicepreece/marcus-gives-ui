import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationService} from "../../services/authentication.service";



@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    console.log('[LoginComponent] onInit')
    this.authenticationService.logout();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.form['username'].value, this.form['password'].value).pipe(
      map(() => {
          return this.router.navigate(['goals'])
        }),
      catchError((error) => {
        this.error = error;
        this.loginForm.reset();
        throw error;
      })).subscribe();
  }
}
