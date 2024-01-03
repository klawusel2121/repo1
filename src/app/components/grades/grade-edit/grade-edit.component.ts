import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {Grade} from "../../../models/grade";
import {StateService} from "../../../services/state.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../../services/form-helper.service";
import _ from "lodash";

@Component({
  selector: 'app-grade-edit',
  templateUrl: './grade-edit.component.html',
  styleUrl: './grade-edit.component.css'
})
export class GradeEditComponent implements OnInit {
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);

  show = false;
  form!: FormGroup;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
      level: this.formBuilder.control(undefined),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
  }

  open(item: Partial<Grade>) {
    this.form.patchValue(_.cloneDeep(item));
    this.show = true;
  }

  apply() {
    const item = this.form.getRawValue();
    if (item.name.length === 0) {
      return;
    }
    this.onApply.emit(item);
  }
}
