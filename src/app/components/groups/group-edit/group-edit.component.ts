import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Group} from "../../../models/group";
import {FirebaseService} from "../../../services/firebase.service";
import {Observable, of} from "rxjs";
import {Grade} from "../../../models/grade";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css'
})
export class GroupEditComponent {
  show = false;
  fbs = inject(FirebaseService);
  grades$: Observable<Grade[]> = of([]);
  item!: Group;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  grades!: Array<Grade>;

  constructor() {
    this.grades$ = this.fbs.getCollection('grades');
    this.grades$.pipe(takeUntilDestroyed()).subscribe(
      grades => this.grades = grades.sort((a, b) => a.level - b.level))
  }

  open(item: Partial<Group>) {
    console.log('open', item)
    this.item = Object.create(item);
    this.show = true;
  }
}
