import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {ClientsComponent} from "../../pages/clients/clients.component";
import {AuthenticationService} from "../../services/authentication.service";
import {GoalsComponent} from "../../pages/goals/goals.component";
import {AppService} from "../../app.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ModalModule} from "ngx-bootstrap/modal";
import {mockUserClient} from "../../models/mocks/mockUser";
import {ClientQuestionsComponent} from "./client-questions.component";
import {ClientRequestService} from "../../services/client-request.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('ClientQuestionsComponent', () => {
  let fixture: ComponentFixture<ClientQuestionsComponent>;
  let component: ClientQuestionsComponent;
  let authenticationService: AuthenticationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        GoalsComponent
      ],
      providers: [
        AppService,
        AuthenticationService,
        ClientRequestService
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
    fixture = TestBed.createComponent(ClientQuestionsComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    authenticationService.userSubject.next(mockUserClient);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
