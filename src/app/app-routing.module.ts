import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { CreateAssigmentComponent } from './create-assigment/create-assigment.component';
import { CustomRoleComponent } from './custom-role/custom-role.component';
import { DeleteRolAssigmentComponent } from './delete-rol-assigment/delete-rol-assigment.component';
import { DeleteRoleComponent } from './delete-role/delete-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { RoleBasedComponent } from './role-based/role-based.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'createAssigment', component: CreateAssigmentComponent, canActivate: [AuthGuard] },
  { path: 'customRole', component: CustomRoleComponent, canActivate: [AuthGuard] },
  { path: 'deleteRoleAssignment', component: DeleteRolAssigmentComponent, canActivate: [AuthGuard] },
  { path: 'deleteRole', component: DeleteRoleComponent, canActivate: [AuthGuard] },
  { path: 'updateRole', component: UpdateRoleComponent, canActivate: [AuthGuard] },
  { path: 'roleBased', component: RoleBasedComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// uso de microsoft entra ID

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { MsalGuard } from '@azure/msal-angular';

// import { LoginComponent } from './login/login.component';
// import { HomeComponent } from './home/home.component';
// import { CreateAssigmentComponent } from './create-assigment/create-assigment.component';
// import { CustomRoleComponent } from './custom-role/custom-role.component';
// import { DeleteRolAssigmentComponent } from './delete-rol-assigment/delete-rol-assigment.component';
// import { DeleteRoleComponent } from './delete-role/delete-role.component';
// import { UpdateRoleComponent } from './update-role/update-role.component';
// import { RoleBasedComponent } from './role-based/role-based.component';
// import { LoginGuard } from './guards/login.guard';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
//   { path: 'home', component: HomeComponent, canActivate: [MsalGuard] },
//   { path: 'createAssigment', component: CreateAssigmentComponent, canActivate: [MsalGuard] },
//   { path: 'customRole', component: CustomRoleComponent, canActivate: [MsalGuard] },
//   { path: 'deleteRoleAssignment', component: DeleteRolAssigmentComponent, canActivate: [MsalGuard] },
//   { path: 'deleteRole', component: DeleteRoleComponent, canActivate: [MsalGuard] },
//   { path: 'updateRole', component: UpdateRoleComponent, canActivate: [MsalGuard] },
//   { path: 'roleBased', component: RoleBasedComponent, canActivate: [MsalGuard] },
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: '**', redirectTo: 'login' }
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, {
//       initialNavigation: 'enabledNonBlocking'
//     })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}