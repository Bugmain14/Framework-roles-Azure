import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    } else {
    return true;
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
// export class LoginGuard implements CanActivate {
//   constructor(private msalService: MsalService, private router: Router) {}

//   canActivate(): boolean | UrlTree {
//     const accounts = this.msalService.instance.getAllAccounts();

//     if (accounts && accounts.length > 0) {
//       // Ya autenticado: redirige a /home
//       return this.router.createUrlTree(['/home']);
//     }

//     // No autenticado: permite entrar al login
//     return true;
//   }
// }