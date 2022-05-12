import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {ClientProfileComponent} from "../client-profile/client-profile.component";
import {UpdatePreferencesModalService} from "../../../components/update-preferences-modal/update-preferences-modal.service";
import {AppService} from "../../../app.service";
import {ClientRequestService} from "../../../services/client-request.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ModalModule} from "ngx-bootstrap/modal";
import {ClientGridComponent} from "./client-grid.component";
import {AdvisorService} from "../../../services/advisor.service";
import {ViewClientModalService} from "../../../components/view-client-modal/view-client-modal.service";
import {AppModule} from "../../../app.module";

describe('ClientGridComponent', () => {
  let fixture: ComponentFixture<ClientGridComponent>;
  let component: ClientGridComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientProfileComponent
      ],
      providers: [
        AppService,
        ClientRequestService,
        AuthenticationService,
        AdvisorService,
        ViewClientModalService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule.forRoot(),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGridComponent);
    component = fixture.componentInstance;
  })

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

});
