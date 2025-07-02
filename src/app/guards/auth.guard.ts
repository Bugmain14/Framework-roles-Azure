import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

// uso de microsoft entra ID

// import { Injectable } from '@angular/core';
// import { CanActivate, Router, UrlTree } from '@angular/router';
// import { MsalService } from '@azure/msal-angular';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private msalService: MsalService, private router: Router) {}

//   canActivate(): boolean | UrlTree {
//     const accounts = this.msalService.instance.getAllAccounts();

//     if (accounts && accounts.length > 0) {
//       return true;
//     }

//     this.msalService.loginRedirect();
//     return false; // Evita navegación mientras se redirige
//   }
// }

