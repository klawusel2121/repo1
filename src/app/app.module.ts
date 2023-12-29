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
import {environment} from "./environments/environment";
import { TenantSelectComponent } from './components/tenant-select/tenant-select.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { GradesComponent } from './components/grades/grades.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseEditComponent } from './components/courses/course-edit/course-edit.component';
import { GradeEditComponent } from './components/grades/grade-edit/grade-edit.component';
import { TeacherEditComponent } from './components/teachers/teacher-edit/teacher-edit.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupEditComponent } from './components/groups/group-edit/group-edit.component';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomEditComponent } from './components/rooms/room-edit/room-edit.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { LessonEditComponent } from './components/lessons/lesson-edit/lesson-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterUserComponent,
    DashboardComponent,
    TenantSelectComponent,
    TeachersComponent,
    GradesComponent,
    CoursesComponent,
    CourseEditComponent,
    GradeEditComponent,
    TeacherEditComponent,
    GroupsComponent,
    GroupEditComponent,
    RoomsComponent,
    RoomEditComponent,
    LessonsComponent,
    LessonEditComponent
  ],
  imports: [
    BrowserModule,

    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
export class AppModule {
}


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
