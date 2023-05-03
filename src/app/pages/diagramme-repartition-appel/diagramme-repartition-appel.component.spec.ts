import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DiagrammeRepartitionAppelComponent} from "./diagramme-repartition-appel.component";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('DiagrammeRepartitionAppelComponent', () => {
  let component: DiagrammeRepartitionAppelComponent;
  let fixture: ComponentFixture<DiagrammeRepartitionAppelComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
      declarations: [
        DiagrammeRepartitionAppelComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagrammeRepartitionAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
