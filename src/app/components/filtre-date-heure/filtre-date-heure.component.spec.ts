import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FiltreDateHeureComponent} from "./filtre-date-heure.component";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {PostService} from "../../service/post.service";
import {StockageCookieService} from "../../service/stockage-cookie.service";
import {ValeursService} from "../../service/valeurs.service";
import spyOn = jest.spyOn;

describe('FiltreDateHeureComponent', () => {
  let component: FiltreDateHeureComponent;
  let fixture: ComponentFixture<FiltreDateHeureComponent>;
  let postService: PostService;
  let stockageCookieService: StockageCookieService;
  let valeursService: ValeursService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        PostService,
        StockageCookieService,
        ValeursService
      ],
      declarations: [
        FiltreDateHeureComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltreDateHeureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    postService = TestBed.inject(PostService);
    stockageCookieService = TestBed.inject(StockageCookieService);
    valeursService = TestBed.inject(ValeursService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly init', () => {
    spyOn(stockageCookieService, 'initialiserDateDebut').mockReturnValue(new Date("2023-01-01"));
    spyOn(stockageCookieService, 'initialiserDateFin').mockReturnValue(new Date("2023-04-01"));
    spyOn(stockageCookieService, 'initialiserHeureDebut').mockReturnValue("08:00");
    spyOn(stockageCookieService, 'initialiserHeureFin').mockReturnValue("20:00");
    spyOn(stockageCookieService, 'getHeureDebut').mockReturnValue("08:00");
    spyOn(stockageCookieService, 'getHeureFin').mockReturnValue("20:00");
    component = new FiltreDateHeureComponent(stockageCookieService, valeursService, postService);

    expect(component.placeholder_debut).toEqual("08:00");
    expect(component.placeholder_fin).toEqual("20:00");
    expect(component.temp_heure_debut).toEqual("08:00");
    expect(component.temp_heure_fin).toEqual("20:00");
    expect(component.temp_date_debut).toEqual(new Date("2023-01-01"));
    expect(component.temp_date_fin).toEqual(new Date("2023-04-01"));
  });

  it('should correctly reinitisalize values when reinitialiserValeurs is called', () => {
    spyOn(stockageCookieService, 'initialiserDateDebut').mockReturnValue(new Date("2023-01-01"));
    spyOn(stockageCookieService, 'initialiserDateFin').mockReturnValue(new Date("2023-04-01"));
    spyOn(stockageCookieService, 'initialiserHeureDebut').mockReturnValue("08:00");
    spyOn(stockageCookieService, 'initialiserHeureFin').mockReturnValue("20:00");
    spyOn(stockageCookieService, 'getHeureDebut').mockReturnValue("08:00");
    spyOn(stockageCookieService, 'getHeureFin').mockReturnValue("20:00");
    component = new FiltreDateHeureComponent(stockageCookieService, valeursService, postService);

    // set new values
    component.temp_heure_debut = "09:00";
    component.temp_heure_fin = "21:00";
    component.temp_date_debut = new Date("2023-02-01");
    component.temp_date_fin = new Date("2023-05-01");
    component.placeholder_debut = "09:00";
    component.placeholder_fin = "21:00";
    // call function
    component.reinitialiserValeurs();
    expect(component.temp_heure_debut).toEqual("08:00");
    expect(component.temp_heure_fin).toEqual("20:00");
  });
});
