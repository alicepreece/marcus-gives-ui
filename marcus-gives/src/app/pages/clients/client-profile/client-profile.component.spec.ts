import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ModalModule} from "ngx-bootstrap/modal";
import {ClientProfileComponent} from "./client-profile.component";
import {ClientRequestService} from "../../../services/client-request.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {UpdatePreferencesModalService} from "../../../components/update-preferences-modal/update-preferences-modal.service";
import {AppService} from "../../../app.service";

describe('ClientProfileComponent', () => {
  let fixture: ComponentFixture<ClientProfileComponent>;
  let component: ClientProfileComponent;
  let updatePreferencesModalService: UpdatePreferencesModalService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientProfileComponent
      ],
      providers: [
        AppService,
        ClientRequestService,
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
    fixture = TestBed.createComponent(ClientProfileComponent);
    component = fixture.componentInstance;
    updatePreferencesModalService = TestBed.inject(UpdatePreferencesModalService);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openUpdatePreferencesModal', () => {
    it('should call modal service', () => {
      spyOn(updatePreferencesModalService, 'open')
      component.openUpdatePreferencesModal();
      expect(updatePreferencesModalService.open).toHaveBeenCalled();
    });
  });
});
