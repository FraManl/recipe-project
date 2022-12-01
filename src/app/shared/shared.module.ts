import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirect } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loadingSpinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

// import all inside a shared module, then export all...
@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirect,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirect,
    CommonModule,
  ],
  // now useful anymore, for ComponentFactoryResolver (Angular 9+)
  entryComponents: [AlertComponent],
})
export class SharedModule {}
