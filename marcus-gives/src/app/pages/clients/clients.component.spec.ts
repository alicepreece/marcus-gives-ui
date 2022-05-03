import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {GoalsComponent} from "../goals/goals.component";
import {DomSanitizer} from "@angular/platform-browser";
import {AppService} from "../../app.service";
import {ViewProjectModalService} from "../../components/view-project-modal/view-project-modal.service";
import {AddProjectModalService} from "../../components/add-project-modal/add-project-modal.service";
import {ClientRequestService} from "../../services/client-request.service";
import {ProjectService} from "../../services/project.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ModalModule} from "ngx-bootstrap/modal";
import {ClientsComponent} from "./clients.component";
import {AuthenticationService} from "../../services/authentication.service";
import {mockUserClient} from "../../models/mocks/mockUser";

describe('ClientsComponent', () => {
  let fixture: ComponentFixture<ClientsComponent>;
  let component: ClientsComponent;
  let authenticationService: AuthenticationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        GoalsComponent
      ],
      providers: [
        AppService,
        AuthenticationService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    authenticationService.userSubject.next(mockUserClient);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should set boolean correctly', () => {
      component.ngOnInit();
      expect(component.isClientProfile).toBeTrue();
    })
  })
});
