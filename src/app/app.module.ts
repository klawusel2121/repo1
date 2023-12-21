import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { CookieService} from "ngx-cookie-service";
import {provideAuth} from "@angular/fire/auth";
import {getAuth} from "firebase/auth";
import { AuthService } from "./services/auth.service";
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {environment} from "./environments/environment";
import { TenantSelectComponent } from './components/tenant-select/tenant-select.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { GradesComponent } from './components/grades/grades.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseEditComponent } from './components/courses/course-edit/course-edit.component';
import { GradeEditComponent } from './components/grades/grade-edit/grade-edit.component';
import { TeacherEditComponent } from './components/teachers/teacher-edit/teacher-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterUserComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    TenantSelectComponent,
    TeachersComponent,
    GradesComponent,
    CoursesComponent,
    CourseEditComponent,
    GradeEditComponent,
    TeacherEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CookieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
