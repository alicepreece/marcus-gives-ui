import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from "@angular/core/testing";
import {ProjectsComponent} from "./projects.component";
import {ProjectService} from "../../services/project.service";
import {mockProject, mockProject1, mockProjects} from "../../models/mocks/mockProjects";
import {AppService} from "../../app.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ViewProjectModalService} from "../../components/view-project-modal/view-project-modal.service";
import {ModalModule} from "ngx-bootstrap/modal";
import {AddProjectModalService} from "../../components/add-project-modal/add-project-modal.service";
import {ClientRequestService} from "../../services/client-request.service";
import {asyncScheduler, scheduled} from "rxjs";
import {GoalEnum} from "../../models/goal.enum";

describe('ProjectComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  let component: ProjectsComponent;
  let projectService: ProjectService;
  let viewProjectModalService: ViewProjectModalService;
  let addProjectModalService: AddProjectModalService;
  let filters: Map<string, string> = new Map<string, string>();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule( {
      declarations: [
        ProjectsComponent
      ],
      providers: [
        ProjectService,
        AppService,
        ViewProjectModalService,
        AddProjectModalService,
        ClientRequestService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    viewProjectModalService = TestBed.inject(ViewProjectModalService);
    addProjectModalService = TestBed.inject(AddProjectModalService);
    filters.set('region', 'APAC');
    filters.set('goal', GoalEnum.INEQUALITY);
    projectService.filters = filters;
    spyOn(projectService, 'getProjects').and.returnValue(scheduled([mockProjects], asyncScheduler))
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should filter for APAC projects', (done) => {
      component.ngOnInit();
      component.projects.subscribe((projects) => {
        expect(projects).toEqual([mockProject1]);
        done();
      })
    })

    it('should filter for goals correctly', (done) => {
      filters.clear()
      filters.set('goal', GoalEnum.ENVIRONMENT)
      component.ngOnInit();
      component.projects.subscribe((projects) => {
        expect(projects).toEqual([mockProject]);
        done();
      })
    })

    it('should set filters correctly', fakeAsync(() => {
      component.ngOnInit();
      expect(component.filters).toEqual(filters);
    }))
  })

  describe('openAddModal', () => {
    it('should call modal open', () => {
      spyOn(addProjectModalService, 'openModal')
      component.openAddModal();
      expect(addProjectModalService.openModal).toHaveBeenCalled();
    })
  })

  describe('openViewModal', () => {
    it('should call open modal', () => {
      spyOn(viewProjectModalService, 'openModal')
      component.openViewModal(mockProject);
      expect(viewProjectModalService.openModal).toHaveBeenCalled();
    });
  })

  describe('resetFilters', () => {
    it('should call onInit', () => {
      spyOn(component, 'ngOnInit');
      component.resetFilters();
      expect(component.ngOnInit).toHaveBeenCalled();
    })

    it('should set filters to undefined', () => {
      component.resetFilters();
      expect(component.filters).toBeUndefined();
    })
  })
})
