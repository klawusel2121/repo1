import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import _ from "lodash";
import {StateService} from "../../services/state.service";
import {FirebaseService} from "../../services/firebase.service";
import {LessonType} from "../../models/lesson-type";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stateService: StateService = inject(StateService);
  fbs: FirebaseService = inject(FirebaseService);
  translate = inject(TranslateService);

  protected readonly LessonType = LessonType;

  countries = [{name: 'DE', lang: 'de-DE'}, {name:'GB', lang: 'en-GB'}]

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.translate.setDefaultLang('de-DE');
    this.translate.use('de-DE');
  }

  ngOnInit(): void {
    this.readData();
  }

  showItems() {
    this.router.navigate(['items'])
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
  }

  changeLanguage(lang: any) {
    this.translate.use(lang)
  }
}
