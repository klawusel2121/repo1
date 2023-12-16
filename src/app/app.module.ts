import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { CookieService} from "ngx-cookie-service";
import { ItemsComponent } from './components/items/items.component';
import { LoginComponent } from './components/login/login.component';
import {provideAuth} from "@angular/fire/auth";
import {getAuth} from "firebase/auth";
import { AuthService } from "./services/auth.service";
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    LoginComponent,
    SignInComponent,
    RegisterUserComponent,
    DashboardComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    provideFirebaseApp(() => initializeApp({
      "projectId": "fire1-4849e",
      "appId": "1:193706716968:web:8e2bbc603253980eaaaa1d",
      "storageBucket": "fire1-4849e.appspot.com",
      "apiKey": "AIzaSyC64bby7tQrjkkiJ2z_Db_kXXgEeCzTzEU",
      "authDomain": "fire1-4849e.firebaseapp.com",
      "messagingSenderId": "193706716968"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule
  ],
  providers: [CookieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
