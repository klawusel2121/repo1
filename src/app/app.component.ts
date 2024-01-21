import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {StateService} from "./services/state.service";
import {FirebaseService} from "./services/firebase.service";
import _ from "lodash";
import {forkJoin} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  router = inject(Router);
  translate = inject(TranslateService);
  authService = inject(AuthService);
  stateService= inject(StateService);
  messageService= inject(NzMessageService);
  fbs = inject(FirebaseService);
  country: any = this.stateService.countries[0];
  isCollapsed = false;
  tenantId: string = '';
  isAdmin = false;
  protected readonly localStorage = localStorage;

  constructor(
  ) {
    const lang: string = localStorage.getItem('lang') ?? 'de-DE';
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.tenantId = localStorage.getItem('tenant') as string
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
        });
      }
    }

    this.authService.loginChanged$.subscribe(value => {
      if (!!value) {
        this.fbs.getCollection('users').subscribe(users => {
          const email = this.authService.UserData.email;
          const user = users.find(u => u.email === email);
          this.isAdmin = user?.role === 'ADMIN';
          if (!user) {
            this.fbs.add('users', {
              name: 'user for ' + email,
              role: users.length === 0 ? 'ADMIN' : 'USER',
              email: email
            }).then(data => {
              this.fbs.getCollection('users').subscribe(users => {
                this.stateService.users = users;
                this.stateService.users$.next(users);
              })
            })
          }
          this.readData();
        })

      }
    })
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

  onLogout(event: any) {
    event.preventDefault();
    this.authService.Logout();
    this.router.navigate(['sign-in']);
  }

  readData(): void {
    console.log('readData', localStorage.getItem('tenant'))

    let items$ = this.fbs.getCollection('courses');
    items$.pipe().subscribe(items => {
      this.stateService.courses = _.sortBy(items, 'name');
      this.stateService.courses$.next(this.stateService.courses);
    })

    items$ = this.fbs.getCollection('groups');
    items$.pipe().subscribe(items => {
      this.stateService.groups = _.sortBy(items, 'name');
      this.stateService.groups$.next(this.stateService.groups);
    })

    items$ = this.fbs.getCollection('rooms');
    items$.pipe().subscribe(items => {
      this.stateService.rooms = _.sortBy(items, 'name');
      this.stateService.rooms$.next(this.stateService.rooms);
    })

    items$ = this.fbs.getCollection('teachers');
    items$.pipe().subscribe(items => {
      this.stateService.teachers = _.sortBy(items, 'short');
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

    items$ = this.fbs.getCollection('users');
    items$.pipe().subscribe(items => {
      this.stateService.users = items;
      this.stateService.users$.next(this.stateService.users);
    })
  }
}
