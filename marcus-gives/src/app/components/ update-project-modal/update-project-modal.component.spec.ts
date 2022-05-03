import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {ClientsComponent} from "../../pages/clients/clients.component";
import {AuthenticationService} from "../../services/authentication.service";
import {GoalsComponent} from "../../pages/goals/goals.component";
import {AppService} from "../../app.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ModalModule} from "ngx-bootstrap/modal";
import {mockUserClient} from "../../models/mocks/mockUser";
import {UpdateProjectModalComponent} from "./update-project-modal.component";
import {UpdatePreferencesModalService} from "../update-preferences-modal/update-preferences-modal.service";
import {UpdateProjectModalService} from "./update-project-modal.service";
import {ProjectService} from "../../services/project.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('UpdateProjectModalComponent', () => {
  let fixture: ComponentFixture<UpdateProjectModalComponent>;
  let component: UpdateProjectModalComponent;
  let authenticationService: AuthenticationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        GoalsComponent
      ],
      providers: [
        AppService,
        AuthenticationService,
        UpdateProjectModalService,
        ProjectService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProjectModalComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    authenticationService.userSubject.next(mockUserClient);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
