import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {Group} from "../../../models/group";
import {FirebaseService} from "../../../services/firebase.service";
import {StateService} from "../../../services/state.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../../services/form-helper.service";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css'
})
export class GroupEditComponent implements OnInit {
  fbs = inject(FirebaseService);
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);

  show = false;
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
      level: this.formBuilder.control(undefined),
      teacherId: this.formBuilder.control(undefined),
      roomId: this.formBuilder.control(undefined),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
  }

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  open(item: Partial<Group>) {
    this.form.patchValue(item);
    this.show = true;
  }

  apply() {
    const item = this.form.getRawValue();
    if (!item.name) {
      this.formHelper.missingFieldMessage('App.Fields.Name')
      return;
    }
    if (!item.level) {
      this.formHelper.missingFieldMessage('App.Fields.Level')
      return;
    }
    this.onApply.emit(item);
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
