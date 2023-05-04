import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MenuDeroulantComponent} from './menu-deroulant.component';
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {PostService} from "../../service/post.service";
import spyOn = jest.spyOn;
import {of} from "rxjs";
import {StockageCookieService} from "../../service/stockage-cookie.service";

describe('DropdownComponent', () => {
  let component: MenuDeroulantComponent;
  let fixture: ComponentFixture<MenuDeroulantComponent>;
  let caisseRegionaleService: CaisseRegionaleService;
  let postService: PostService;
  let stockageCookieService: StockageCookieService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({

      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        CaisseRegionaleService,
        PostService,
        StockageCookieService
      ],
      declarations: [MenuDeroulantComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuDeroulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    caisseRegionaleService = TestBed.inject(CaisseRegionaleService);
    stockageCookieService = TestBed.inject(StockageCookieService);
    postService = TestBed.inject(PostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with correct data', () => {
    spyOn(postService, 'postNombreAppels').mockReturnValue(of({
        nbrAppel: 120,
        moyenneTempsAttente: 10,
        moyenneTempsTravail: 23,
        rubIdCaisse: [88100, 88200],
        caisse: ["Savoie","Ile de france"],
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
    spyOn(stockageCookieService, 'initialiserCaisseRegionale').mockReturnValue(-1);
    component.ngOnInit();
    expect(component.rubIdCaisse).toEqual([88100, 88200]);
    expect(component.caisse).toEqual(["Savoie", "Ile de france"]);
    expect(component.caisse_selectionnee).toEqual(-1);
  });

  it('should set caisse with correct data', () => {
    spyOn(stockageCookieService, 'setCaisseRegionale');
    spyOn(stockageCookieService, 'reinitialiserMultiSelection');
    spyOn(caisseRegionaleService, 'setCaisse');
    component.setCaisse(88100);
    expect(stockageCookieService.setCaisseRegionale).toHaveBeenCalledWith(88100);
    expect(stockageCookieService.reinitialiserMultiSelection).toHaveBeenCalled();
    expect(caisseRegionaleService.setCaisse).toHaveBeenCalledWith(88100);
  });

  it('should return caisses with correct data', () => {
    component.caisse_selectionnee = 88100;
    component.rubIdCaisse = [88100, 88200];
    component.caisse = ["Savoie", "Ile de france"];
    expect(component.getCaisses()).toEqual([{id: 88100, label:"Savoie"}, {id:88200, label:"Ile de france"}]);
  });

  it('should invert ouvree parameter', () => {
    component.isOuvert = true;
    component.bascule();
    expect(component.isOuvert).toEqual(false);

    //in the other way
    component.isOuvert = false;
    component.bascule();
    expect(component.isOuvert).toEqual(true);
  });

  it('should set ouvree parameter on false', () => {
    component.isOuvert = true;
    component.clicHorsMenu();
    expect(component.isOuvert).toEqual(false);
  });


});
