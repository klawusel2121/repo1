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
      from: this.formBuilder.control(undefined),
      to: this.formBuilder.control(undefined),
      type: this.formBuilder.control(undefined),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
  }

  open(item: Partial<Lesson>) {
    this.form.patchValue(_.cloneDeep(item));
    this.show = true;
  }

  apply() {
    const item = this.form.getRawValue();
    if (item.name.length === 0) {
      return;
    }
    if (!item.position) {
      return;
    }
    if (!item.from) {
      return;
    }
    if (!item.to) {
      return;
    }
    if (!item.type) {
      return;
    }
    this.onApply.emit(item);
  }

  protected readonly LessonType = LessonType;
  protected readonly object = object;
}
