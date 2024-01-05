import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {StateService} from "./services/state.service";
import {FirebaseService} from "./services/firebase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  stateService: StateService = inject(StateService);
  fbs: FirebaseService = inject(FirebaseService);
  country: any = this.stateService.countries[0];

  tenantId: string = '';

  protected readonly localStorage = localStorage;

  constructor(
    public router: Router,
    private translate: TranslateService
  ) {
    translate.setDefaultLang(this.stateService.countries[0].lang);
    translate.use(this.stateService.countries[0].lang);
    this.tenantId = localStorage.getItem('tenant') as string
    this.changeLanguage(this.stateService.countries[0]);
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      const email = userData?.email;
      const password = localStorage.getItem('password');
      console.log('app-init', user, userData, email, password);
      if (email && password) {
        this.authService.Login(email, password).then(() => {
          console.warn('logged in')
          this.readData()
        });
      }
    }
  }

  signIn() {
    this.router.navigate(['sign-in'])
  }

  navigate(path: string, event: any) {
    event.preventDefault();
    if (!path) {
      return;
    }
    this.router.navigate([path]);
  }

  changeTenant(event: string) {
    this.authService.setTenant(event);
  }

  onLogout(event: any) {
    event.preventDefault();
    this.authService.Logout();
    this.router.navigate(['sign-in']);
  }

  changeLanguage(country: any) {
    this.translate.use(country.lang)
  }
  readData(): void {

    let items$ = this.fbs.getCollection('courses');
    items$.pipe().subscribe(items => {
      this.stateService.courses = items;
      this.stateService.courses$.next(this.stateService.courses);
    })

    items$ = this.fbs.getCollection('groups');
    items$.pipe().subscribe(items => {
      this.stateService.groups = items;
      this.stateService.groups$.next(this.stateService.groups);
    })

    items$ = this.fbs.getCollection('rooms');
    items$.pipe().subscribe(items => {
      this.stateService.rooms = items;
      this.stateService.rooms$.next(this.stateService.rooms);
    })

    items$ = this.fbs.getCollection('teachers');
    items$.pipe().subscribe(items => {
      this.stateService.teachers = items;
      this.stateService.teachers$.next(this.stateService.teachers);
    })

    items$ = this.fbs.getCollection('coursesPerWeek');
    items$.pipe().subscribe(items => {
      this.stateService.coursesPerWeek = items;
      this.stateService.coursesPerWeek$.next(this.stateService.coursesPerWeek);
    })

    items$ = this.fbs.getCollection('teacherCourse');
    items$.pipe().subscribe(items => {
      this.stateService.teacherCourses = items;
      this.stateService.teacherCourses$.next(this.stateService.teacherCourses);
    })

    items$ = this.fbs.getCollection('lessons');
    items$.pipe().subscribe(items => {
      this.stateService.lessons = items.sort((a, b) => a.position - b.position);
      this.stateService.lessons$.next(this.stateService.lessons);
    })

    items$ = this.fbs.getCollection('plans');
    items$.pipe().subscribe(items => {
      this.stateService.plans = items;
      this.stateService.plans$.next(this.stateService.plans);
    })

    items$ = this.fbs.getCollection('days');
    items$.pipe().subscribe(items => {
      this.stateService.days = items;
      this.stateService.days$.next(this.stateService.days);
    })

    items$ = this.fbs.getCollection('tenants');
    items$.pipe().subscribe(items => {
      this.stateService.tenants = items;
      this.stateService.tenants$.next(this.stateService.tenants);
    })
  }
}
