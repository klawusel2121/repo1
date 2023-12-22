import {Component, EventEmitter, Output} from '@angular/core';
import {Group} from "../../../models/group";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css'
})
export class GroupEditComponent {
  show = false;

  item!: Group;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  open(item: Group) {
    this.item = Object.create(item);
    this.show = true;
  }
}
