import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {Group} from "../../models/group";
import {GroupEditComponent} from "./group-edit/group-edit.component";
import {TranslateService} from "@ngx-translate/core";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent {
  editItem: any;
  source = 'groups';

  @ViewChild(GroupEditComponent)
  modal: GroupEditComponent = new GroupEditComponent;

  constructor(
    private fbs: FirebaseService,
    private translate: TranslateService,
    public stateService: StateService,
  ) {
  }

  ngOnInit(): void {
  }

  add() {
    const name = this.translate.instant('App.Group.Group')
    const item = {name: name, isNew: true};
    setTimeout(() => {this.edit(item);}, 100)
  }

  remove(item: Group) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Partial<Group>) {
    if (!('isNew' in item)) {
      item.isNew = false;
    }
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Group) {
    console.log('onApply', item);
    const patch = {name: item.name, level: item.level, roomId: item.roomId};
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
