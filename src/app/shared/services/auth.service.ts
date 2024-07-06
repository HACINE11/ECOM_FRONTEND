import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface IUser {
  email: string;
  avatarUrl?: string;
  nom?: string;
  prenom?: string;
  entreprise?: string;
  matriculeFiscal?: string;
  address?: string;
  mobile?: number;
  role?: string;
}

const defaultPath = '/';
const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

@Injectable()
export class AuthService {
  private _user: IUser | null = null;
  get loggedIn(): boolean {  return !!this._user; }

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
          localStorage.setItem("token", response.token);
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

  //sign up nouveau admin
  createAccount(nom: string, prenom: string, email: string, motPasse: string, address:string, mobile:number) : Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/signup', { nom, prenom, email, motPasse, address, mobile })
      .pipe(
        map(response => {
          this.router.navigate(['/verify-email']);
          return { isOk: true };
        }),
        catchError(error => {
          return of({ isOk: false, message: "Failed to create account" });
        })
      );
  }

  
  verifyAccount(email: string, code: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/verify', { email, code })
      .pipe(
        map(response => {
          this.router.navigate(['/login']);
          return { isOk: true };
        }),
        catchError(error => {
          return of({ isOk: false, message: "Failed to verify account" });
        })
      );
  }


  resetPassword(email: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/forgetpassword', { email })
      .pipe(
        map(response => {
          return { isOk: true, message: 'Recovery email sent' };
        }),
        catchError(error => {
          return of({ isOk: false, message: 'Failed to reset password' });
        })
      );
  }
  changePassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/resetpassword', { token, newPassword })
      .pipe(
        map(response => {
          return { isOk: true, message: 'Password has been reset' };
        }),
        catchError(error => {
          return of({ isOk: false, message: 'Error resetting password' });
        })
      );
  }


  async logOut() {
    this._user = null;
    this.router.navigate(['/login-form']);
    localStorage.removeItem("token");
  }
 
getUserSession(): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) {
    return of({ isOk: false, data: null });
  }

  return this.http.get<any>('http://localhost:9090/user/session', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).pipe(
    map(response => {
      this._user = response;
      return { isOk: true, data: this._user };
    }),
    catchError(error => {
      return of({ isOk: false, data: null });
    })
  );
}

getUserProfile(id: string): Observable<any> { 
      return this.http.get<any>('http://localhost:9090/user/' + id).pipe(map(response => response),catchError(error => 
        {console.error('Error fetching profile:', error);
          throw error;
        })    );  }


updateUserProfile(id: string, data: Partial<IUser>): Observable<any> {
          return this.http.put<void>(`http://localhost:9090/user/${id}`, data).pipe(map(response => response),
          catchError(error => { console.error('Error updating profile:', error); throw error; }) );
         } 
}


@Injectable({ providedIn:'root'  })

export class AuthGuardService {
 
  constructor( @Inject(Router) private router: Router, private authService: AuthService) { }

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'verify-email',
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

    return isLoggedIn || isAuthForm;  }
}
