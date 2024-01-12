import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {Teacher} from "../../../models/teacher";
import {StateService} from "../../../services/state.service";
import {Guid} from "guid-typescript";
import {TeacherCourse} from "../../../models/teacherCourse";
import {Course} from "../../../models/course";
import {CoursePerWeek} from "../../../models/coursePerWeek";
import _ from "lodash";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../../services/form-helper.service";

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrl: './teacher-edit.component.css'
})
export class TeacherEditComponent implements OnInit {
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);

  show = false;
  form!: FormGroup;
  item!: Partial<Teacher>;
  courses: Array<Course> = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
      short: this.formBuilder.control(undefined),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
  }

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  open(item: Partial<Teacher>) {
    this.item = _.cloneDeep(item);
    this.form.patchValue(this.item);
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
    const item = this.form.getRawValue();

    if (!item.name) {
      this.formHelper.missingFieldMessage('App.Fields.Name')
      return;
    }
    if (!item.short) {
      this.formHelper.missingFieldMessage('App.Fields.Short')
      return;
    }

    this.onApply.emit(item);
  }

  cancel() {
    this.onCancel.emit();
  }
}
