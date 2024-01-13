import {ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {Course} from "../../../models/course";
import {CoursePerWeek} from "../../../models/coursePerWeek";
import {StateService} from "../../../services/state.service";
import { Guid } from 'guid-typescript';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormHelperService} from "../../../services/form-helper.service";
import _ from "lodash";
import {Group} from "../../../models/group";
import {LessonType} from "../../../models/lesson-type";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent implements OnInit {
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);
  changeDetector = inject(ChangeDetectorRef);

  show = false;
  form!: FormGroup;
  item!: Partial<Course>;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
      type: this.formBuilder.control(undefined),
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
    this.item.weeklyHours.forEach(item => item.edit = false);
    this.show = true;
  }

  addHour() {
    const newItem: Partial<CoursePerWeek> = {
      courseId: this.item.id, hours: 1, isNew: true, id: Guid.create().toString(), edit: true
    }
    this.item.weeklyHours = [...this.item.weeklyHours!, newItem];
  }

  groupName(item: Partial<CoursePerWeek>) {
    return this.stateService.groups.find(t => t.id === item.groupId)?.name ?? '';
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

    if (!item.name) {
      this.formHelper.missingFieldMessage('App.Fields.Name')
      return;
    }
    if (!item.type) {
      this.formHelper.missingFieldMessage('App.Fields.Type')
      return;
    }

    item.deleteHours = this.item.deleteHours;
    item.weeklyHours = this.item.weeklyHours;
    this.onApply.emit(item);
  }

  cancel(): void {
    this.onCancel.emit();
  }

  editHour(item: Partial<CoursePerWeek>) {
    item.backup = _.cloneDeep(item);
    item.edit = true;
    console.log('editHour', item)
  }

  cancelEditHour(item: Partial<CoursePerWeek>) {
    item.edit = false;
    item.groupId = item.backup?.groupId;
    item.hours = item.backup?.hours;
    item.backup = undefined;
  }

  saveEditHour(item: Partial<CoursePerWeek>) {
    console.log('saveEditHour', _.cloneDeep(item))
    item.backup = undefined;
    item.edit = false;
  }

  protected readonly LessonType = LessonType;
}
