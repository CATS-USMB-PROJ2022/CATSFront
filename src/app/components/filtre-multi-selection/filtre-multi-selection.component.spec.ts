import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FiltreMultiSelectionComponent} from "./filtre-multi-selection.component";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {StockageCookieService} from "../../service/stockage-cookie.service";
import {PostService} from "../../service/post.service";
import {ValeursService} from "../../service/valeurs.service";
import spyOn = jest.spyOn;
import {of} from "rxjs";

describe('FiltreMultiSelectionComponent', () => {
  let component: FiltreMultiSelectionComponent;
  let fixture: ComponentFixture<FiltreMultiSelectionComponent>;
  let stockageCookieService: StockageCookieService;
  let postService: PostService;
  let valeurService: ValeursService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        StockageCookieService,
        PostService,
        ValeursService
      ],
      declarations: [
        FiltreMultiSelectionComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltreMultiSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stockageCookieService = TestBed.inject(StockageCookieService);
    postService = TestBed.inject(PostService);
    valeurService = TestBed.inject(ValeursService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should init with correct values', () => {
    spyOn(postService, 'postNombreAppels').mockReturnValue(of(
      {nbrAppel: 1,
        moyenneTempsAttente: 1,
        moyenneTempsTravail: 1,
        rubIdCaisse: [88100],
        caisse: ["Savoie"],
        gtAppeleId: ["gt1","gt2"],
        gtAppele: ["groupetrafic1", "groupetrafic2"],
        rubTypenum: ["rubtypenum1","rubtypenum2","rubtypenum3"],
        labelsStatut: ["com","abd"],
        valuesStatut: [80,20],
        nbTransfert: 125,
        nbTransfertOk: 24,
        moyenneTransfertTentatives: 1.05,
        labelsCauseFin: ["cause1","cause2"],
        valuesCauseFin: [12,45],
        nbDebordement: 12}
    ));
    component.ngOnInit();
    component.agences = [{nom: "rubtypenum1", coche: false}, {nom: "rubtypenum2", coche: false}, {nom: "rubtypenum3", coche: false}];
    component.groupes_trafic = [{nom: "groupetrafic1", coche: false}, {nom: "groupetrafic2", coche: false}];
    component.gtAppeleId = ["gt1","gt2"];
  });
});
