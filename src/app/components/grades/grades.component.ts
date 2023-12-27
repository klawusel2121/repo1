import {Component, ViewChild} from '@angular/core';
import {Observable, of, tap} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {GradeEditComponent} from "./grade-edit/grade-edit.component";
import {Grade} from "../../models/grade";
import {TranslateService} from "@ngx-translate/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent {
  items$: Observable<Array<Grade>> = of([]);
  items: Array<Grade> = [];
  editItem: any;
  source = 'grades';

  @ViewChild(GradeEditComponent)
  modal: GradeEditComponent = new GradeEditComponent;

  constructor(
    private fbs: FirebaseService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.fbs.getCollection(this.source);
    this.items$.pipe().subscribe(items =>
      this.items = items.sort((a, b) => a.level - b.level))
  }

  add() {
    const name = this.translate.instant('App.Grade.Grade')
    const item = {name: name, isNew: true};
    setTimeout(() => {
      this.edit(item);
    }, 100)
  }

  remove(item: Grade) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Partial<Grade>) {
    if (!('isNew' in item)) {
      item.isNew = false;
    }
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Grade) {
    const patch = {name: item.name, level: item.level};
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
