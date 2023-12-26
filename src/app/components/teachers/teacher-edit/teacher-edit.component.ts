import {Component, EventEmitter, Output} from '@angular/core';
import {Teacher} from "../../../models/teacher";

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrl: './teacher-edit.component.css'
})
export class TeacherEditComponent {
  show = false;

  item!: Teacher;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  open(item: Partial<Teacher>) {
    this.item = Object.create(item);
    this.show = true;
  }
}
