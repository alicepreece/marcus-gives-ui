import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {AuthenticationService} from "../../services/authentication.service";
import {GoalsComponent} from "../../pages/goals/goals.component";
import {AppService} from "../../app.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ModalModule} from "ngx-bootstrap/modal";
import {mockUserClient} from "../../models/mocks/mockUser";
import {UpdatePreferencesModalComponent} from "./update-preferences-modal.component";
import {UpdatePreferencesModalService} from "./update-preferences-modal.service";

describe('UpdatePreferencesModalComponent', () => {
  let fixture: ComponentFixture<UpdatePreferencesModalComponent>;
  let component: UpdatePreferencesModalComponent;
  let authenticationService: AuthenticationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        GoalsComponent
      ],
      providers: [
        AppService,
        AuthenticationService,
        UpdatePreferencesModalService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePreferencesModalComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    authenticationService.userSubject.next(mockUserClient);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
