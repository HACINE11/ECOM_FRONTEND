import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface IUser {
  email: string;
  avatarUrl?: string;
}

const defaultPath = '/';
const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

@Injectable()
export class AuthService {
  private _user: IUser | null = null;
  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) 
      {
        this._lastAuthenticatedPath = value;
      }

  constructor(private router: Router, private http:HttpClient){}

  logIn(email: string, motPasse: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/signin', { email, motPasse })
      .pipe( map(response => {
          this._user = { ...defaultUser, email: response.result.email };
          this.router.navigate([this._lastAuthenticatedPath]);
          return { isOk: true, data: this._user };
        }),
        catchError(error => {
          return of({ isOk: false, message: "Authentication failed" });
        })
      );
  }
  //affichage la liste des utlisateurs 
  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  //sign up 
  createAccount(email: string, motPasse: string) : Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/signup', { email, motPasse })
      .pipe(
        map(response => {
          this.router.navigate(['/create-account']);
          return { isOk: true };
        }),
        catchError(error => {
          return of({ isOk: false, message: "Failed to create account" });
        })
      );
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this._user = null;
    this.router.navigate(['/login-form']);
  }
}

@Injectable({ providedIn:'root'  })

export class AuthGuardService implements CanActivate {
  
  constructor( @Inject(Router) private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
