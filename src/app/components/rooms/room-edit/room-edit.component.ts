import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {Room} from "../../../models/room";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../../services/form-helper.service";
import _ from "lodash";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);

  show = false;
  form!: FormGroup;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
      size: this.formBuilder.control(undefined),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
  }

  open(item: Partial<Room>) {
    this.form.patchValue(_.cloneDeep(item));
    this.show = true;
  }

  apply() {
    const item = this.form.getRawValue();
    if (!item.name) {
      this.formHelper.missingFieldMessage('App.Fields.Name')
      return;
    }
    if (!item.size) {
      this.formHelper.missingFieldMessage('App.Fields.Size')
      return;
    }
    this.onApply.emit(item);
  }

  cancel() {
    this.onCancel.emit();
  }
}
