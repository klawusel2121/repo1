import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CookieService} from "ngx-cookie-service";
import {provideAuth} from "@angular/fire/auth";
import {getAuth} from "firebase/auth";
import {AuthService} from "./services/auth.service";
import {SignInComponent} from './components/sign-in/sign-in.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {environment} from "./environments/environment";
import {TenantSelectComponent} from './components/tenant-select/tenant-select.component';
import {TeachersComponent} from './components/teachers/teachers.component';
import {CoursesComponent} from './components/courses/courses.component';
import {CourseEditComponent} from './components/courses/course-edit/course-edit.component';
import {TeacherEditComponent} from './components/teachers/teacher-edit/teacher-edit.component';
import {GroupsComponent} from './components/groups/groups.component';
import {GroupEditComponent} from './components/groups/group-edit/group-edit.component';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RoomsComponent} from './components/rooms/rooms.component';
import {RoomEditComponent} from './components/rooms/room-edit/room-edit.component';
import {LessonsComponent} from './components/lessons/lessons.component';
import {LessonEditComponent} from './components/lessons/lesson-edit/lesson-edit.component';
import {PlansComponent} from './components/plans/plans.component';
import {PlanEditComponent} from './components/plans/plan-edit/plan-edit.component';
import {DaysComponent} from './components/days/days.component';
import {PlanCellsEditComponent} from './components/plans/plan-cells-edit/plan-cells-edit.component';
import {PlanCellEditComponent} from './components/plans/plan-cell-edit/plan-cell-edit.component';
import {TenantEditComponent} from './components/tenant-edit/tenant-edit.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzIconModule} from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

import {IconDefinition} from '@ant-design/icons-angular';
import {
  AccountBookFill, AlertFill, AlertOutline,
  DashboardOutline, EyeFill, EyeOutline, EyeInvisibleOutline, EyeInvisibleFill,
  MenuOutline, MenuFoldOutline, SaveOutline
}
  from '@ant-design/icons-angular/icons';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';


registerLocaleData(de);

/** config ng-zorro-antd i18n **/
import { provideNzI18n, de_DE} from 'ng-zorro-antd/i18n';
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {NzTimePickerComponent} from "ng-zorro-antd/time-picker";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const icons: IconDefinition[] = [
  AccountBookFill, AlertOutline, AlertFill, DashboardOutline,
  EyeFill, EyeOutline, EyeInvisibleOutline, EyeInvisibleFill,
  MenuOutline, MenuFoldOutline, SaveOutline
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterUserComponent,
    DashboardComponent,
    TenantSelectComponent,
    TeachersComponent,
    CoursesComponent,
    CourseEditComponent,
    TeacherEditComponent,
    GroupsComponent,
    GroupEditComponent,
    RoomsComponent,
    RoomEditComponent,
    LessonsComponent,
    LessonEditComponent,
    PlansComponent,
    PlanEditComponent,
    DaysComponent,
    PlanCellsEditComponent,
    PlanCellEditComponent,
    TenantEditComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzPopconfirmModule,
    NzModalModule,
    // ngx-translate and the loader module
    HttpClientModule,
    NzIconModule.forRoot(icons),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    FormsModule,
    NzIconDirective,
    NzSelectComponent,
    NzOptionComponent,
    NzModalComponent,
    NzSwitchComponent,
    NzTimePickerComponent
  ],
  providers: [CookieService, AuthService, provideNzI18n(de_DE)],
  bootstrap: [AppComponent]
})
export class AppModule {
}


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
