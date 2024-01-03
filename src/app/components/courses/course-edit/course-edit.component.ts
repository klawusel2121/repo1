import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {Course} from "../../../models/course";
import {CoursePerWeek} from "../../../models/coursePerWeek";
import {StateService} from "../../../services/state.service";
import { Guid } from 'guid-typescript';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormHelperService} from "../../../services/form-helper.service";
import _ from "lodash";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent implements OnInit {
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);

  show = false;
  form!: FormGroup;
  item!: Partial<Course>;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
  }

  open(item: Partial<Course>) {
    this.item = _.cloneDeep(item);
    this.form.patchValue(_.cloneDeep(item));
    this.item.deleteHours = [];
    const list = this.stateService.coursesPerWeek.filter(courseweek => item.id === courseweek.courseId) ?? []
    this.item.weeklyHours = list.sort((a,b) => a.level - b.level);
    if (!this.item.weeklyHours) {
      this.item.weeklyHours = [];
    }
    this.show = true;
  }

  addHour() {
    const newItem: Partial<CoursePerWeek> = {courseId: this.item.id, hours: 1, isNew: true, id: Guid.create().toString()}
    this.item.weeklyHours?.push(newItem);
  }

  removeHour(item: Partial<CoursePerWeek>): void {
    const index = this.item.weeklyHours?.findIndex(i => (i.id == item.id)) ?? -1;
    if (index !== -1) {
      this.item.deleteHours?.push(<string>item.id);
      this.item.weeklyHours?.splice(index, 1);
    }
  }

  apply() {
    const item = this.form.getRawValue();
    if (item.name.length === 0) {
      return;
    }
    item.deleteHours = this.item.deleteHours;
    item.weeklyHours = this.item.weeklyHours;
    this.onApply.emit(item);
  }

  availableGrades() {
    const grades = _.cloneDeep(this.stateService.grades);
    this.item.weeklyHours?.forEach(h => {
      const index = grades.findIndex(g => g.level == h.level);
      if (index !== -1) {
        grades.splice(index, 1);
      }
    });

    return grades;
  }
}
