import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {Course} from "../../models/course";
import {GradeEditComponent} from "./grade-edit/grade-edit.component";
import {Grade} from "../../models/grade";

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent {
  items$: Observable<any[]> = of([]);
  editItem: any;
  source = 'grades';

  @ViewChild(GradeEditComponent)
  modal: GradeEditComponent = new GradeEditComponent;

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

  remove(item: Grade) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Grade) {
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Grade) {
    this.fbs.update(this.source, this.editItem, {name: item.name});
    this.modal.show = false;
  }

  onCancel() {
    this.modal.show = false;
  }
}
