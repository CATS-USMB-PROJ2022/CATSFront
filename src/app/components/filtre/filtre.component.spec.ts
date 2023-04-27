import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FiltreComponent} from "./filtre.component";
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('FiltreComponent', () => {
  let component: FiltreComponent;
  let fixture: ComponentFixture<FiltreComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let resetBtn: DebugElement;
  let confirmBtn: DebugElement;

  @Component({
    selector: 'app-test-host',
    template: `
      <filtre [reinitialisation]="reinit" [confirmation]="confirm">
        <p>Component</p>
      </filtre>
    `,
  })
  class TestHostComponent {
    public reinit = jest.fn();
    public confirm = jest.fn();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FiltreComponent, TestHostComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltreComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    resetBtn = hostFixture.debugElement.query(By.css('#button-reinit'));
    confirmBtn = hostFixture.debugElement.query(By.css('#button-conf'));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have inputs', () => {
    expect(component.reinitialisation).toBeDefined();
    expect(component.confirmation).toBeDefined();
  });

  it('should call the reinitialisation function on reset button click', () => {
    resetBtn.triggerEventHandler('click', null);
    expect(hostComponent.reinit).toHaveBeenCalled();
  });

  it('should call the confirmation function on confirm button click', () => {
    confirmBtn.triggerEventHandler('click', null);
    expect(hostComponent.confirm).toHaveBeenCalled();
  });

  it('should display the transcluded content', () => {
    const transcludedContent = hostFixture.debugElement.query(By.css('p'));
    expect(transcludedContent.nativeElement.textContent.trim()).toBe('Component');
  });

});
