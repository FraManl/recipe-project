import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

// new interface > define the data we're working with (optional but it is a good practice)
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // works like a normal subject, but also gives access to previously emitted value
  // we use it because we want to access to the latest user's token
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    // return the observable
    return (
      this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=      AIzaSyCH2nfQnbGT9P74h6_w8JdBhF8bat-LojM',
          { email: email, password: password, returnSecureToken: true }
        )
        // tap allows to do some operations without modifying the response
        .pipe(
          catchError(this.handleError),
          tap((resData) => {
            this.handleAuth(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          })
        )
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH2nfQnbGT9P74h6_w8JdBhF8bat-LojM',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuth(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationData = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationData);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    // errorRes.error.error.message === 'EMAIL_EXISTS'
    //   ? (errorMessage = 'This e-mail is already in use by another account.')
    //   : '';
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password.';
        break;
    }

    return throwError(errorMessage);
  }
}
