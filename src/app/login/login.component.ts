// login con ID
// import { Component } from '@angular/core';
// import { MsalService } from '@azure/msal-angular';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html'
// })
// export class LoginComponent {
//   constructor(private msalService: MsalService) {}

//   login() {
//     console.log('🔐 Botón de login presionado');
//     this.msalService.loginRedirect();
//   }
// }

//login simulado

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log('🔐 Login simulado');
    this.authService.login();
    this.router.navigate(['/home']);
  }
}

