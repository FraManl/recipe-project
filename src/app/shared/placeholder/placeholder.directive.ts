import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  // view container ref : gives access to the reference to a pointer at the place where the directive is used
  // need to make it public to access it from outside
  // viewContainerRef helps make the directive visible from the outside (inside auth.component), and bindable to ng-template appPlaceholder
  constructor(public viewContainerRef: ViewContainerRef) {}
}
