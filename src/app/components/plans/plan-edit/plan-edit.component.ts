import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {StateService} from "../../../services/state.service";
import {Plan} from "../../../models/plan";
import _ from "lodash";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../../services/form-helper.service";

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrl: './plan-edit.component.css'
})
export class PlanEditComponent implements OnInit {
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
      groupId: this.formBuilder.control(undefined),
      groupName: this.formBuilder.control(undefined),
      from: this.formBuilder.control(undefined),
      to: this.formBuilder.control(undefined),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
  }

  open(item: Partial<Plan>) {
    this.form.patchValue(_.cloneDeep(item));
    this.show = true;
  }

  apply() {
    if (this.form.getRawValue().name?.length === 0) {
      return;
    }
    const group = this.stateService.groups.find(g => g.id === this.form.get('groupId')?.value);
    if (group) {
      this.form.get('groupId')?.setValue(group.id) ;
      this.form.get('groupName')?.setValue(group.name) ;
    }
    this.onApply.emit(this.form.getRawValue());
  }
}
