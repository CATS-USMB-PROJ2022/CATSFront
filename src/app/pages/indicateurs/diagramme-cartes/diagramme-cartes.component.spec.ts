import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DiagrammeCartesComponent} from "./diagramme-cartes.component";
import spyOn = jest.spyOn;

describe('DiagrammeCartesComponent', () => {
  let component: DiagrammeCartesComponent;
  let fixture: ComponentFixture<DiagrammeCartesComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DiagrammeCartesComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagrammeCartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data on init', () => {
    spyOn(component, 'getDataStatus');
    component.ngOnInit();
    expect(component.getDataStatus).toHaveBeenCalled();
  });
});
