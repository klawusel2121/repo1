import {Component, EventEmitter, inject, Output} from '@angular/core';
import {StateService} from "../../../services/state.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../../services/form-helper.service";
import {User} from "../../../models/user";
import _ from "lodash";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);

  show = false;
  form!: FormGroup;
  item!: Partial<User>;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
      role: this.formBuilder.control(undefined),
      email: this.formBuilder.control(undefined),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
  }

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  open(item: Partial<User>) {
    this.item = _.cloneDeep(item);
    this.form.patchValue(this.item);
    this.show = true;
  }

  apply() {
    const item = this.form.getRawValue();

    if (!item.name) {
      this.formHelper.missingFieldMessage('App.Fields.Name')
      return;
    }

    this.onApply.emit(item);
  }

  cancel() {
    this.onCancel.emit();
  }

}
