import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FirebaseService} from "../../../services/firebase.service";
import {Room} from "../../../models/room";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent {
  show = false;
  fbs = inject(FirebaseService);
  item!: Room;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  open(item: Partial<Room>) {
    this.item = Object.create(item);
    this.show = true;
  }

  apply() {
    if (this.item.name.length === 0) {
      return;
    }
    if (!this.item.size) {
      return;
    }
    this.onApply.emit(this.item);
  }
}
