import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from "@angular/core/testing";
import {mockProject, mockProject1, mockProjects} from "../../models/mocks/mockProjects";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ViewProjectModalService} from "../../components/view-project-modal/view-project-modal.service";
import {ModalModule} from "ngx-bootstrap/modal";
import {AddProjectModalService} from "../../components/add-project-modal/add-project-modal.service";
import {ClientRequestService} from "../../services/client-request.service";
import {GoalsComponent} from "./goals.component";
import {AppService} from "../../app.service";
import {ProjectService} from "../../services/project.service";
import {GoalEnum} from "../../models/goal.enum";
import {DomSanitizer} from "@angular/platform-browser";

describe('GoalsComponent', () => {
  let fixture: ComponentFixture<GoalsComponent>;
  let component: GoalsComponent;
  let sanitizer: DomSanitizer;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule( {
      declarations: [
        GoalsComponent
      ],
      providers: [
        AppService,
        ViewProjectModalService,
        AddProjectModalService,
        ClientRequestService,
        ProjectService,
        {provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: (val: string) => val
          }}
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('onSelectGoal', () => {
    it('should set url to environment', () => {
      component.onSelectGoal('Protect the Environment');
      const url = sanitizer.bypassSecurityTrustResourceUrl('https://ourworldindata.org/grapher/forest-area-as-share-of-land-area')
      expect(component.currentUrl).toEqual(url)
    });

    it('should set url to inequalities', () => {
      component.onSelectGoal('More Equal Societies');
      const url = sanitizer.bypassSecurityTrustResourceUrl("https://ourworldindata.org/grapher/economic-inequality-gini-index")
      expect(component.currentUrl).toEqual(url);
    });
  })
})
