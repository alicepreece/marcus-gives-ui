import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {ClientsComponent} from "../../pages/clients/clients.component";
import {AuthenticationService} from "../../services/authentication.service";
import {GoalsComponent} from "../../pages/goals/goals.component";
import {AppService} from "../../app.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ModalModule} from "ngx-bootstrap/modal";
import {mockUserClient} from "../../models/mocks/mockUser";
import {AddProjectModalComponent} from "./add-project-modal.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddProjectModalService} from "./add-project-modal.service";
import {ProjectService} from "../../services/project.service";

describe('AddProjectModalComponent', () => {
  let fixture: ComponentFixture<AddProjectModalComponent>;
  let component: AddProjectModalComponent;
  let authenticationService: AuthenticationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        GoalsComponent
      ],
      providers: [
        AppService,
        AuthenticationService,
        AddProjectModalService,
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
    fixture = TestBed.createComponent(AddProjectModalComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    authenticationService.userSubject.next(mockUserClient);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
