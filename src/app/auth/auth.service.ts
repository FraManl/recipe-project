import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// new interface > define the data we're working with (optional but it is a good practice)
interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  signup(email: string, password: string) {
    // return the observable
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=      AIzaSyCH2nfQnbGT9P74h6_w8JdBhF8bat-LojM',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage: string = 'An unknown error occured!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          errorRes.error.error.message === 'EMAIL_EXISTS'
            ? (errorMessage =
                'This e-mail is already in use by another account.')
            : '';

          return throwError(errorMessage);
        })
      );
  }
}
