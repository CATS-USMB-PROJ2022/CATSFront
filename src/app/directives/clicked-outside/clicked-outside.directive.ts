import {AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {filter, fromEvent, Subscription} from "rxjs";

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<void>;

  onClicDocument: Subscription | undefined;

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) {
  }

  ngAfterViewInit() {
    this.onClicDocument = fromEvent(this.document, 'click')
      .pipe(filter((event) => !this.isDansDocument((event as MouseEvent).clientX, (event as MouseEvent).clientY)))
      .subscribe(() => this.clickOutside.emit());
  }

  ngOnDestroy() {
    this.onClicDocument?.unsubscribe();
  }

  isDansDocument(mouseX: number, mouseY: number): boolean {
    const {top, right, bottom, left} = this.element.nativeElement.getBoundingClientRect();
    return (left <= mouseX && mouseX <= right) && (top <= mouseY && mouseY <= bottom);
  }
}
