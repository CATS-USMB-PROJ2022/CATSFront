import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DiagrammeRepartitionAppelComponent} from "./diagramme-repartition-appel.component";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {PostService} from "../../service/post.service";
import {ValeursService} from "../../service/valeurs.service";

describe('DiagrammeRepartitionAppelComponent', () => {
  let component: DiagrammeRepartitionAppelComponent;
  let fixture: ComponentFixture<DiagrammeRepartitionAppelComponent>;
  let caisseRegionaleService: CaisseRegionaleService;
  let postService: PostService;
  let valeursService: ValeursService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        CaisseRegionaleService,
        PostService,
        valeursService
      ],
      declarations: [
        DiagrammeRepartitionAppelComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagrammeRepartitionAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    caisseRegionaleService = TestBed.inject(CaisseRegionaleService);
    postService = TestBed.inject(PostService);
    valeursService = TestBed.inject(ValeursService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ', () => {

  });
});
