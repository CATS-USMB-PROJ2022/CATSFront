import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DiagrammeRepartitionAppelComponent} from "./diagramme-repartition-appel.component";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {of} from "rxjs";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";

describe('DiagrammeRepartitionAppelComponent', () => {
  let component: DiagrammeRepartitionAppelComponent;
  let fixture: ComponentFixture<DiagrammeRepartitionAppelComponent>;

  let mockCaisseRegionaleService: any;
  let mockPostService: any;
  let mockValeursService: any;
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
