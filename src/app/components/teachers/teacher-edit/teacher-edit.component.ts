import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Teacher} from "../../../models/teacher";
import {StateService} from "../../../services/state.service";
import {Guid} from "guid-typescript";
import {TeacherCourse} from "../../../models/teacherCourse";
import {Course} from "../../../models/course";
import {CoursePerWeek} from "../../../models/coursePerWeek";
import _ from "lodash";

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrl: './teacher-edit.component.css'
})
export class TeacherEditComponent {
  show = false;
  item!: Partial<Teacher>;
  courses: Array<Course> = [];
  availableCourses: Array<Course> = [];
  stateService = inject(StateService);

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  open(item: Partial<Teacher>) {
    this.item = _.cloneDeep(item);
    this.item.deleteCourses = [];
    const list = this.stateService.teacherCourses.filter(c => item.id === c.teacherId) ?? []
    this.item.courses = list;
    this.show = true;
  }

  addCourse() {
    const newItem: Partial<TeacherCourse> = { teacherId: this.item.id, courseId: this.item.id, isNew: true, id: Guid.create().toString()}
    this.item.courses?.push(newItem);
  }

  removeCourse(teacherCourse: Partial<TeacherCourse>) {
    const index = this.item.courses?.findIndex(i => (i.courseId == teacherCourse.courseId)) ?? -1;
    console.log('removeCourse', index, this.item, teacherCourse)
    if (index !== -1) {
      this.item.deleteCourses?.push(<string>teacherCourse.courseId);
      this.item.courses?.splice(index,1);
    }
  }

  apply() {
    if (this.item.name?.length === 0) {
      return;
    }
    this.onApply.emit(this.item);
  }

}
