import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@angular/fire/auth-guard';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CoursesComponent} from "./components/courses/courses.component";
import {TeachersComponent} from "./components/teachers/teachers.component";
import {GroupsComponent} from "./components/groups/groups.component";
import {RoomsComponent} from "./components/rooms/rooms.component";
import {LessonEditComponent} from "./components/lessons/lesson-edit/lesson-edit.component";
import {LessonsComponent} from "./components/lessons/lessons.component";
import {PlansComponent} from "./components/plans/plans.component";
import {DaysComponent} from "./components/days/days.component";
import {TenantEditComponent} from "./components/tenant-edit/tenant-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'courses', component: CoursesComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'days', component: DaysComponent },
  { path: 'tenant', component: TenantEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
