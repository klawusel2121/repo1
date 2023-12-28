import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {Course} from "../../models/course";
import {CourseEditComponent} from "./course-edit/course-edit.component";
import {TranslateService} from "@ngx-translate/core";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  editItem: any;
  source = 'courses';

  @ViewChild(CourseEditComponent)
  modal: CourseEditComponent = new CourseEditComponent;

  constructor(
    private fbs: FirebaseService,
    private translate: TranslateService,
    public stateService: StateService,
  ) {
  }

  ngOnInit(): void {
  }

  add() {
    const name = this.translate.instant('App.Course.Course')
    const item = {name: name, isNew: true};
    setTimeout(() => {this.edit(item);}, 100)
  }

  remove(item: Course) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Partial<Course>) {
    if (!('isNew' in item)) {
      item.isNew = false;
    }
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Course) {
    console.log('onApply', item)
    const patch = {name: item.name};
    if (this.editItem.isNew) {
      this.editItem.isNew = false;
      this.fbs.add(this.source, {...this.editItem, ...patch}).then(
        course => {
          item.weeklyHours.forEach(weeklyHour => {
            if (weeklyHour.isNew) {
              weeklyHour.courseId = course.id;
              weeklyHour.isNew = false;
              this.fbs.add('coursesPerWeek', weeklyHour);
            }
          })
        }
      )
    } else {
      item.deleteHours.forEach(id => {
        this.fbs.remove('coursesPerWeek', id);
      })
      item.weeklyHours.forEach(weeklyHour => {
        if (weeklyHour.isNew) {
          weeklyHour.isNew = false;
          this.fbs.add('coursesPerWeek', weeklyHour);
        } else {
          this.fbs.update('coursesPerWeek', weeklyHour, {});
        }
      })
      this.fbs.update(this.source, this.editItem, patch);
    }
    this.modal.show = false;
  }

  onCancel() {
    this.modal.show = false;
  }
}
