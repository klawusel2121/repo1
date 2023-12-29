import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FirebaseService} from "../../../services/firebase.service";
import {StateService} from "../../../services/state.service";
import {Lesson} from "../../../models/lesson";
import {Plan} from "../../../models/plan";

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrl: './plan-edit.component.css'
})
export class PlanEditComponent {
  show = false;
  fbs = inject(FirebaseService);
  stateService = inject(StateService);
  item!: Plan;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  open(item: Partial<Plan>) {
    this.item = Object.create(item);
    this.show = true;
  }

  apply() {
    if (this.item.name.length === 0) {
      return;
    }
    this.onApply.emit(this.item);
  }

}
