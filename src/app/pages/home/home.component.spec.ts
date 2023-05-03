import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {StockageCookieService} from "../../service/stockage-cookie.service";
import {Appel} from "../../model/appel";
import spyOn = jest.spyOn;
import {of} from "rxjs";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let caisseRegionaleService: CaisseRegionaleService;
  let valeursService: ValeursService;
  let postService: PostService;
  let stockageCookieService: StockageCookieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        CaisseRegionaleService,
        ValeursService,
        PostService,
        StockageCookieService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    caisseRegionaleService = TestBed.inject(CaisseRegionaleService);
    valeursService = TestBed.inject(ValeursService);
    postService = TestBed.inject(PostService);
    stockageCookieService = TestBed.inject(StockageCookieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should initialize data on init', () => {
    spyOn(component, 'initialiserDonneesAppels');
    component.ngOnInit();
    expect(component.initialiserDonneesAppels).toHaveBeenCalled();
  });

  it ('should call postNombreAppels on data initialization', () => {
    spyOn(postService, 'postNombreAppels').mockReturnValue(
      of({
        nbrAppel: 120,
        moyenneTempsAttente: 10,
        moyenneTempsTravail: 23,
        rubIdCaisse: [88100],
        caisse: ["Savoie"],
        gtAppeleId: ["gt1","gt2"],
        gtAppele: ["gtappel1","gtappel2"],
        rubTypenum: ["typenum","typenum2"],
        labelsStatut: ["com","abd"],
        valuesStatut: [80,20],
        nbTransfert: 12,
        nbTransfertOk: 40,
        moyenneTransfertTentatives: 1.08,
        labelsCauseFin: ["cause1","cause2"],
        valuesCauseFin: [40,20],
        nbDebordement: 11
      })
    );
    component.initialiserDonneesAppels();
    expect(postService.postNombreAppels).toHaveBeenCalled();
    expect(component.nombreAppels).toEqual(120);
    expect(component.tempsAttenteMoyen).toEqual(10);
    expect(component.tempsCommunicationMoyen).toEqual(23);
    expect(component.labelsStatut).toEqual(['com', 'abd']);
    expect(component.valuesStatut).toEqual([80, 20]);
    expect(component.labelsCauseFin).toEqual(["cause1","cause2"]);
    expect(component.valuesCauseFin).toEqual([40, 20]);
    expect(component.nbDebordement).toEqual(11);
    expect(component.nbTransfert).toEqual(12);
    expect(component.nbTransfertOk).toEqual(40);
    expect(component.moyenneTransfertTentatives).toEqual(1.08);
    expect(component.pourcentage_autres).toEqual(20);
    expect(component.pourcentage_en_communication).toEqual(80);
    });

});
