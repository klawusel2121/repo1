import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"fire1-4849e","appId":"1:193706716968:web:8e2bbc603253980eaaaa1d","storageBucket":"fire1-4849e.appspot.com","apiKey":"AIzaSyC64bby7tQrjkkiJ2z_Db_kXXgEeCzTzEU","authDomain":"fire1-4849e.firebaseapp.com","messagingSenderId":"193706716968"})),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
