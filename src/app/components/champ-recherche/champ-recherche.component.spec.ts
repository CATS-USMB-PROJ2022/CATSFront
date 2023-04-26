import {ComponentFixture, TestBed} from '@angular/core/testing';
import { ChampRechercheComponent } from './champ-recherche.component';

describe('ChampRechercheComponent', () => {
  let component: ChampRechercheComponent;
  let fixture: ComponentFixture<ChampRechercheComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChampRechercheComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChampRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
