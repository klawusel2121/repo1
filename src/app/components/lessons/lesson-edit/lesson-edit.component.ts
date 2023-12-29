import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FirebaseService} from "../../../services/firebase.service";
import {StateService} from "../../../services/state.service";
import {Lesson} from "../../../models/lesson";

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrl: './lesson-edit.component.css'
})
export class LessonEditComponent {
  show = false;
  fbs = inject(FirebaseService);
  stateService = inject(StateService);
  item!: Lesson;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  open(item: Partial<Lesson>) {
    this.item = Object.create(item);
    this.show = true;
  }

  apply() {
    if (this.item.name.length === 0) {
      return;
    }
    if (!this.item.position) {
      return;
    }
    if (!this.item.from) {
      return;
    }
    if (!this.item.to) {
      return;
    }
    this.onApply.emit(this.item);
  }
}
