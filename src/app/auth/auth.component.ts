import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable, onErrorResumeNext, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  // Doing this like so, will make that angular will search for existing directives with that name in the DOM
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    // .subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.isLoading = false;
    //   },
    //   (errorMessage) => {
    //     this.error = errorMessage;

    //     // better to move error handling into auth service

    //     //   switch (errorRes.error.error.message) {
    //     //     case 'EMAIL_EXISTS':
    //     //       this.error = 'This e-mail is already in use by another account.';
    //     //   }

    //     //   this.error = 'An error occured...';
    //     this.isLoading = false;
    //   }
    // );

    authObs.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        // alternative to dynamic component
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  // show component programatically (alternative to dynamic component)
  private showErrorAlert(message: string) {
    // dynamically & programatically create alert component
    // can't do it like this : const alertCmp = new AlertComponent();
    // instead do this (let angular create the component, using componentFactory)
    const alertCompFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // now we need a location inside the dom where we can attach this component to (viewchild)
    // now we have a reference to our directive pushed inside its own ng-template
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
