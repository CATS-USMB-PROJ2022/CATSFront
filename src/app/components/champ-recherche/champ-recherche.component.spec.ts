import { TestBed } from '@angular/core/testing';
import { ChampRechercheComponent } from './champ-recherche.component';

describe('ChampRechercheComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChampRechercheComponent
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ChampRechercheComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
