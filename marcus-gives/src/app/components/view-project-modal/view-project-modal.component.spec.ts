import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {ClientsComponent} from "../../pages/clients/clients.component";
import {AuthenticationService} from "../../services/authentication.service";
import {GoalsComponent} from "../../pages/goals/goals.component";
import {AppService} from "../../app.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ModalModule} from "ngx-bootstrap/modal";
import {mockUserClient} from "../../models/mocks/mockUser";
import {ViewProjectModalComponent} from "./view-project-modal.component";
import {ViewProjectModalService} from "./view-project-modal.service";
import {ClientRequestService} from "../../services/client-request.service";
import {ProjectService} from "../../services/project.service";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {mockProject} from "../../models/mocks/mockProjects";
import {mockClient} from "../../models/mocks/mockClient";

describe('ViewProjectModalComponent', () => {
  let fixture: ComponentFixture<ViewProjectModalComponent>;
  let component: ViewProjectModalComponent;
  let authenticationService: AuthenticationService;
  let projectService: ProjectService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        GoalsComponent
      ],
      providers: [
        AppService,
        AuthenticationService,
        ViewProjectModalService,
        ClientRequestService,
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
    fixture = TestBed.createComponent(ViewProjectModalComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    projectService = TestBed.inject(ProjectService);
    authenticationService.userSubject.next(mockUserClient);
    component.updateProjectForm = component.formBuilder.group({});
    component.donateForm = component.formBuilder.group({});
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmitUpdate', () => {
    xit('should call update project', () => {
      spyOn(projectService, 'updateProject');
      component.onSubmitUpdate();
      expect(projectService.updateProject).toHaveBeenCalled()
    })
  });

  describe('cancelDonation', () => {
    xit('should call cancelDonation', () => {
      spyOn(projectService, 'cancelDonation');
      component.cancelDonation(mockProject);
      expect(projectService.cancelDonation).toHaveBeenCalled()
    })
  });

  describe('onSubmitDonation', () => {
    xit('should call donate', () => {
      spyOn(projectService, 'donate');
      component.onSubmitDonation(mockProject);
      expect(projectService.donate).toHaveBeenCalled()
    })
  });

  describe('isClientProject', () => {
    it('should return true if client project', () => {
      component.client = mockClient;
      expect(component.isClientProject(mockProject)).toBeTrue();
    })
  })
});
