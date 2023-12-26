import {Component, EventEmitter, Output} from '@angular/core';
import {Course} from "../../../models/course";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent {
  show = false;

  item!: Course;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  open(item: Partial<Course>) {
    this.item = Object.create(item);
    this.show = true;
  }
}
