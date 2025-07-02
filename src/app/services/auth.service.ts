import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(): void {
    this.isAuthenticated = true;
    if (this.isBrowser) {
      localStorage.setItem('isLoggedIn', 'true');
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    if (this.isBrowser) {
      localStorage.removeItem('isLoggedIn');
    }
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}

// uso de microsoft entra ID, complementar cuando este el backend junto (idTokenClaims, accessToken)

// import { Injectable } from '@angular/core';
// import { MsalService } from '@azure/msal-angular';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private msalService: MsalService) {}

//   login(): void {
//     this.msalService.loginRedirect();
//   }

//   logout(): void {
//     this.msalService.logoutRedirect({ postLogoutRedirectUri: '/' });
//   }

//   isLoggedIn(): boolean {
//     const accounts = this.msalService.instance.getAllAccounts();
//     return accounts && accounts.length > 0;
//   }
// }