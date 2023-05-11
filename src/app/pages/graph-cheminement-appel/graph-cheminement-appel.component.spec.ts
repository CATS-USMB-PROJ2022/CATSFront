import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCheminementAppelComponent } from './graph-cheminement-appel.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import spyOn = jest.spyOn;
import {of} from "rxjs";

describe('GraphCheminementAppelComponent', () => {
  let component: GraphCheminementAppelComponent;
  let fixture: ComponentFixture<GraphCheminementAppelComponent>;
  let postService: PostService;
  let caisseRegionaleService: CaisseRegionaleService;
  let valeursService: ValeursService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphCheminementAppelComponent ],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        ValeursService,
        PostService,
        CaisseRegionaleService
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphCheminementAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    postService = TestBed.inject(PostService);
    caisseRegionaleService = TestBed.inject(CaisseRegionaleService);
    valeursService = TestBed.inject(ValeursService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data on init', () => {
    spyOn(component, 'getData');
    component.ngOnInit();
    expect(component.getData).toHaveBeenCalled();
  });

  it('should call postCheminementAppel on data initialization', () => {
    spyOn(postService, 'postCheminementAppel').mockReturnValue(of({
      edges: [
        ["AG","APL","123"],
        ["APL","AG","456"]
      ],
      nodes: [["AG", 10],["APL", 5]]
    }));
    component.getData();
    expect(postService.postCheminementAppel).toHaveBeenCalled();
    expect(component.arbre).toEqual([
      ["AG", "APL", "123"],
      ["APL", "AG", "456"]
    ]);
    expect(component.labels).toEqual([["AG", 10],["APL", 5]]);
  });
  it('should call ngOnChange on data initialization', () => {
    spyOn(postService, 'postCheminementAppel').mockReturnValue(of({
      edges: [
        ["AG", "APL", "123"],
        ["APL", "AG", "456"]
      ],
      nodes: [["AG", 10],["APL", 5]]
    }));
    spyOn(component, 'ngOnChanges');
    component.getData();
    expect(postService.postCheminementAppel).toHaveBeenCalled();
    expect(component.ngOnChanges).toHaveBeenCalled();
    expect(component.nodes).toEqual([
      {id: "AG", index: 0, nb: 10, fx : 25, fy : 25, vx: 0, vy: 0, x: 7.0710678118654755, y: 0},
      {id: "APL", index: 1, nb: 5, vx: 0, vy: 0, x: -9.03088751750192, y: 8.273032735715967}
    ]);
    expect(component.links).toEqual([{
      index: 0, nb: 123, source:  {
        id: "AG", index: 0, nb:10, fx : 25, fy : 25, vx: 0, vy: 0, x: 7.0710678118654755, y: 0,},
      target:  {
      id: "APL", index: 1, nb: 5, vx: 0, vy: 0, x: -9.03088751750192, y: 8.273032735715967,},
    },{
      index: 1, nb: 456, source: {
        id: "APL", index: 1, nb:5, vx: 0, vy: 0, x: -9.03088751750192, y: 8.273032735715967,},
      target:  {
        id: "AG", index: 0, nb: 10, fx : 25, fy : 25, vx: 0, vy: 0, x: 7.0710678118654755, y: 0,},
    },
    ]);
  });

  it('should return the correct node ID', () => {
    spyOn(postService, 'postCheminementAppel').mockReturnValue(of({
      edges: [
        ["AG", "APL", "123"],
        ["APL", "AG", "456"]
      ],
      nodes: [["AG", 10], ["APL", 5]]
    }));
    component.getData();
    expect(component.getIdNode("AG")).toEqual(0);
    expect(component.getIdNode("APL")).toEqual(1);
    expect(component.getIdNode("LABEL INEXISTANT")).toEqual(-1);
  });

  it('should return the max number of appel', () => {
    spyOn(postService, 'postCheminementAppel').mockReturnValue(of({
      edges: [
        ["AG", "APL", "123"],
        ["APL", "AG", "456"]
      ],
      nodes: ["AG", "APL"]
    }));
    component.getData();
    expect(component.getNbAppelMax()).toEqual(456);
  });
});
