import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {StateService} from "../../../services/state.service";
import {Lesson} from "../../../models/lesson";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../../services/form-helper.service";
import _ from "lodash";
import {LessonType} from "../../../models/lesson-type";
import {object} from "@angular/fire/database";

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrl: './lesson-edit.component.css'
})
export class LessonEditComponent implements OnInit {
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);

  show = false;
  form!: FormGroup;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      position: this.formBuilder.control(undefined),
      name: this.formBuilder.control(undefined),
      fromDate: this.formBuilder.control(undefined),
      toDate: this.formBuilder.control(undefined),
      type: this.formBuilder.control(undefined),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
  }

  open(item: Partial<Lesson>) {

    if (item.from?.indexOf(":")) {
      let fromDate = new Date();
      fromDate.setHours(+(item.from!.split(':')[0]))
      fromDate.setMinutes(+(item.from!.split(':')[1]))
      item.fromDate = fromDate;
    }

    if (item.to?.indexOf(":")) {
      let toDate = new Date();
      toDate.setHours(+(item.to!.split(':')[0]))
      toDate.setMinutes(+(item.to!.split(':')[1]))
      item.toDate = toDate;
    }

    this.form.patchValue(_.cloneDeep(item));
    this.show = true;
  }

  apply() {
    const item = this.form.getRawValue();
    if (!item.name) {
      return;
    }
    if (!item.position) {
      return;
    }
    if (!item.type) {
      return;
    }
    if (item.fromDate) {
      item.from = String(item.fromDate.getHours()).padStart(2, '0')
        + ':' + String(item.fromDate.getMinutes()).padStart(2, '0');
    } else {
      return;
    }
    if (item.toDate) {
      item.to = String(item.toDate.getHours()).padStart(2, '0')
        + ':' + String(item.toDate.getMinutes()).padStart(2, '0');
    } else {
      return;
    }
    delete item.fromDate;
    delete item.toDate;

    this.onApply.emit(item);
  }

  protected readonly LessonType = LessonType;
  protected readonly object = object;

  cancel() {
    this.onCancel.emit();
  }
}
