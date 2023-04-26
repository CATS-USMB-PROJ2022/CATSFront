import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {DiagrammeCartesComponent} from "./diagramme-cartes.component";

describe('DiagrammeCartesComponent', () => {
  let component: DiagrammeCartesComponent;
  let fixture: ComponentFixture<DiagrammeCartesComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DiagrammeCartesComponent
      ],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'}
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
