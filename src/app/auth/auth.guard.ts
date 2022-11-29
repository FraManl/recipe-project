import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Guard redirecting : The old way with tap()
  //   canActivate(
  //     route: ActivatedRouteSnapshot,
  //     state: RouterStateSnapshot
  //   ): boolean | Observable<boolean> | Promise<boolean> | UrlTree {
  //     return this.authService.user.pipe(
  //       map((user) => {
  //         return !!user;
  //       }),
  //       tap((isAuth) => {
  //         if (!isAuth) {
  //           this.router.navigate(['/auth']);
  //         }
  //       })
  //     );
  //   }

  // Guard redirecting : New way with Url Tree
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> | Promise<boolean> {
    return this.authService.user.pipe(
      // we add take(1) because user is a subject, and it can emit data more than once.. and we don't want to generate unwanted side effects here as the guard keeps listening to this observable, like if user is emitted again in the application, for other purposes than login/logout, it will redirect..., so better to select the user once, and then kill the guard, unless we run the guard again, which should happen only if the route /recipes if fired >> so we take the latest value of user, then unsubscribe
      take(1), // take latest user, then unsubscribe, to avoid on-going user subscription
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
