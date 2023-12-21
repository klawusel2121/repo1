import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {TeacherEditComponent} from "./teacher-edit/teacher-edit.component";
import {Teacher} from "../../models/teacher";

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
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.fbs.getCollection(this.source);
  }

  add() {
    const item = {name: 'JOHN DOE'};
    this.fbs.add(this.source, item)
    setTimeout(() => {this.editItem(item);}, 100)
  }

  remove(item: Teacher) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Teacher) {
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Teacher) {
    this.fbs.update(this.source, this.editItem, {name: item.name});
    this.modal.show = false;
  }

  onCancel() {
    this.modal.show = false;
  }

}
