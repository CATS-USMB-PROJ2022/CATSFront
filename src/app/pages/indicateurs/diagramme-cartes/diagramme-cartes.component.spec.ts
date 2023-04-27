import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DiagrammeCartesComponent} from "./diagramme-cartes.component";

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
});
