import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ItemsComponent} from "./components/items/items.component";
import { AuthGuard, AuthPipe, AuthPipeGenerator } from '@angular/fire/auth-guard';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SecureInnerPageGuard} from "./guard/secure-inner-page.guard";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
