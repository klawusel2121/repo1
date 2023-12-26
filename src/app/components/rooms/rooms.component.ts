import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {TranslateService} from "@ngx-translate/core";
import {RoomEditComponent} from "./room-edit/room-edit.component";
import {Room} from "../../models/room";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  items$: Observable<any[]> = of([]);
  editItem: Partial<Room> = {};
  source = 'rooms';

  @ViewChild(RoomEditComponent)
  modal: RoomEditComponent = new RoomEditComponent;

  constructor(
    private fbs: FirebaseService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.fbs.getCollection(this.source);
  }

  add() {
    const name = this.translate.instant('App.Room.Room')
    const item = {name: name, isNew: true, size: 20};
    setTimeout(() => {this.edit(item);}, 100)
  }

  remove(item: Room) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Partial<Room>) {
    if (!('isNew' in item)) {
      item.isNew = false;
    }
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Room) {
    const patch = {name: item.name, size: item.size};
    if (this.editItem.isNew) {
      this.editItem.isNew = false;
      this.fbs.add(this.source, {...this.editItem, ...patch});
    } else {
      this.fbs.update(this.source, this.editItem, patch);
    }
    this.modal.show = false;
  }

  onCancel() {
    this.modal.show = false;
  }

}
