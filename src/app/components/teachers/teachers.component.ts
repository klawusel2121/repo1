import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {TeacherEditComponent} from "./teacher-edit/teacher-edit.component";
import {Teacher} from "../../models/teacher";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {
  items$: Observable<any[]> = of([]);
  editItem: any;
  source = 'teachers';

  @ViewChild(TeacherEditComponent)
  modal: TeacherEditComponent = new TeacherEditComponent;

  constructor(
    private fbs: FirebaseService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.fbs.getCollection(this.source);
  }

  add() {
    const name = this.translate.instant('App.Teacher.Teacher')
    const item = {name: name, isNew: true};
    setTimeout(() => {this.edit(item);}, 100)
  }

  remove(item: Teacher) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Partial<Teacher>) {
    if (!('isNew' in item)) {
      item.isNew = false;
    }
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Teacher) {
    const patch = {name: item.name};
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
