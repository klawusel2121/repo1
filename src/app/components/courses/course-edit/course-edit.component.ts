import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Course} from "../../../models/course";
import {CoursePerWeek} from "../../../models/coursePerWeek";
import {StateService} from "../../../services/state.service";
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent {
  show = false;
  item!: Course;
  stateService = inject(StateService);

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  open(item: Partial<Course>) {
    this.item = Object.create(item);
    this.item.deleteHours = [];
    const list = this.stateService.coursesPerWeek.filter(courseweek => item.id === courseweek.courseId) ?? []
    this.item.weeklyHours = list.sort((a,b) => a.level - b.level);
    this.show = true;
    console.log('openitem', item, list)
  }

  add() {
    const newItem: Partial<CoursePerWeek> = {courseId: this.item.id, hours: 1, isNew: true, id: Guid.create().toString()}
    this.item.weeklyHours.push(newItem);
  }

  remove(item: Partial<CoursePerWeek>): void {
    const index = this.item.weeklyHours.findIndex(i => (i.id == item.id));
    if (index !== -1) {
      this.item.deleteHours.push(<string>item.id);
      this.item.weeklyHours.splice(index,1);
    }
  }
}
