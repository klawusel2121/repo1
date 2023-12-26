import {Component, EventEmitter, Output} from '@angular/core';
import {Grade} from "../../../models/grade";

@Component({
  selector: 'app-grade-edit',
  templateUrl: './grade-edit.component.html',
  styleUrl: './grade-edit.component.css'
})
export class GradeEditComponent {
  show = false;

  item!: Grade;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  open(item: Partial<Grade>) {
    this.item = Object.create(item);
    this.show = true;
  }
}
