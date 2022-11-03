import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({ selector: '[appDropdown]' })

// adds a css class on an element when it is clicked, and remove the class when clicked again
export class DropdownDirect {
  // attach an 'open' class to class array
  @HostBinding('class.open') isOpen = false;

  // this will only allow to close the tab by clicking on it
  //   @HostListener('click') toggleOpen() {
  //     this.isOpen = !this.isOpen;
  //   }

  // to make it closable when we click anywhere, do so
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
}
