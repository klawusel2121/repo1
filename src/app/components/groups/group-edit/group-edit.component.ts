import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Group} from "../../../models/group";
import {FirebaseService} from "../../../services/firebase.service";
import {Observable, of} from "rxjs";
import {Grade} from "../../../models/grade";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {StateService} from "../../../services/state.service";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css'
})
export class GroupEditComponent {
  show = false;
  fbs = inject(FirebaseService);
  stateService = inject(StateService);
  grades$: Observable<Grade[]> = of([]);
  item!: Group;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  grades!: Array<Grade>;
  levels: number[];

  constructor() {
    this.levels = this.stateService.grades.map(item => item.level);
  }

  open(item: Partial<Group>) {
    console.log('open', item, this.levels)
    this.item = Object.create(item);
    this.show = true;
  }
}
