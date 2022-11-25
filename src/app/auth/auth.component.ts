import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { onErrorResumeNext } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
    } else {
      this.authService.signup(email, password).subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
        },
        (errorMessage) => {
          this.error = errorMessage;

          // better to move error handling into auth service

          //   switch (errorRes.error.error.message) {
          //     case 'EMAIL_EXISTS':
          //       this.error = 'This e-mail is already in use by another account.';
          //   }

          //   this.error = 'An error occured...';
          this.isLoading = false;
        }
      );
      form.reset();
    }
  }
}
