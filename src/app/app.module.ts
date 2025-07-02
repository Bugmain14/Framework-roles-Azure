import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateAssigmentComponent } from './create-assigment/create-assigment.component';
import { CustomRoleComponent } from './custom-role/custom-role.component';
import { DeleteRolAssigmentComponent } from './delete-rol-assigment/delete-rol-assigment.component';
import { DeleteRoleComponent } from './delete-role/delete-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { RoleBasedComponent } from './role-based/role-based.component';

import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  MsalRedirectComponent,
  MsalInterceptor
} from '@azure/msal-angular';

import {
  PublicClientApplication,
  InteractionType
} from '@azure/msal-browser';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateAssigmentComponent,
    CustomRoleComponent,
    DeleteRolAssigmentComponent,
    DeleteRoleComponent,
    UpdateRoleComponent,
    RoleBasedComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: '00000000-0000-0000-0000-000000000000', // ✅ Reemplaza con el tuyo real
          authority: 'https://login.microsoftonline.com/common',
          redirectUri: 'http://localhost:4200' // ✅ o tu URL real
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: false
        }
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          // Ejemplo: ['https://api.midominio.com/api/', ['api://xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/access_as_user']]
          //  agregar la URL de tu API y los scopes requeridos
        ])
      }
    )
  ],
  providers: [
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {}
