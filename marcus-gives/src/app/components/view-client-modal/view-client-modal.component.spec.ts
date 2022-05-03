import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {ClientsComponent} from "../../pages/clients/clients.component";
import {AuthenticationService} from "../../services/authentication.service";
import {GoalsComponent} from "../../pages/goals/goals.component";
import {AppService} from "../../app.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ModalModule} from "ngx-bootstrap/modal";
import {mockUserClient} from "../../models/mocks/mockUser";
import {ViewClientModalComponent} from "./view-client-modal.component";
import {ViewClientModalService} from "./view-client-modal.service";
import {ClientRequestService} from "../../services/client-request.service";
import {ProjectService} from "../../services/project.service";

describe('ViewClientModalComponent', () => {
  let fixture: ComponentFixture<ViewClientModalComponent>;
  let component: ViewClientModalComponent;
  let authenticationService: AuthenticationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        GoalsComponent
      ],
      providers: [
        AppService,
        AuthenticationService,
        ViewClientModalService,
        ClientRequestService,
        ProjectService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClientModalComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    authenticationService.userSubject.next(mockUserClient);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
