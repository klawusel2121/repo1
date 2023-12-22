import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {Group} from "../../models/group";
import {GroupEditComponent} from "./group-edit/group-edit.component";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent {
  items$: Observable<any[]> = of([]);
  editItem: any;
  source = 'groups';

  @ViewChild(GroupEditComponent)
  modal: GroupEditComponent = new GroupEditComponent;

  constructor(
    private fbs: FirebaseService,
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.fbs.getCollection(this.source);
  }

  add() {
    const item = {name: 'GRADE', level: 1};
    this.fbs.add(this.source, item)
    setTimeout(() => {this.editItem(item);}, 100)
  }

  remove(item: Group) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Group) {
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Group) {
    this.fbs.update(this.source, this.editItem, {name: item.name, grade: item.grade});
    this.modal.show = false;
  }

  onCancel() {
    this.modal.show = false;
  }
}
