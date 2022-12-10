import {AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {filter, fromEvent, Subscription} from "rxjs";

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<void>;

  documentClickSubscription: Subscription | undefined;

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) { }

  ngAfterViewInit() {
    this.documentClickSubscription = fromEvent(this.document, 'click').pipe(
      filter((event) => {
      return !this.isInside(event.target as HTMLElement);
      })
    ).subscribe(() => {
      this.clickOutside.emit();
    });
  }

  ngOnDestroy() {
    this.documentClickSubscription?.unsubscribe();
  }

  isInside(element: HTMLElement): boolean {
    return element === this.element.nativeElement || this.element.nativeElement.contains(element);
  }
}
