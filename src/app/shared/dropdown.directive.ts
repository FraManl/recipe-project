import {
  Directive,
  HostBinding,
  HostListener,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({ selector: '[appDropdown]' })

// adds a css class on an element when it is clicked, and remove the class when clicked again
export class DropdownDirect {
  //   @Input() set appDropdown(condition: boolean) {}

  //   constructor(
  //     private templateRef: TemplateRef<any>,
  //     private vcRef: ViewContainerRef
  //   ) {}

  // attach an 'open' class to class array
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
