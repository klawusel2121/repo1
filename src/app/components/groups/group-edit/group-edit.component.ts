import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Group} from "../../../models/group";
import {FirebaseService} from "../../../services/firebase.service";
import {StateService} from "../../../services/state.service";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css'
})
export class GroupEditComponent {
  show = false;
  fbs = inject(FirebaseService);
  stateService = inject(StateService);
  item!: Group;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  open(item: Partial<Group>) {
    this.item = Object.create(item);
    this.show = true;
  }

  apply() {
    if (this.item.name.length === 0) {
      return;
    }
    if (!this.item.level) {
      return;
    }
    this.onApply.emit(this.item);
  }
}
