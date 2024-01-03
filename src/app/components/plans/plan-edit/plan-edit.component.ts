import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FirebaseService} from "../../../services/firebase.service";
import {StateService} from "../../../services/state.service";
import {Lesson} from "../../../models/lesson";
import {Plan} from "../../../models/plan";
import _ from "lodash";
import {Group} from "../../../models/group";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrl: './plan-edit.component.css'
})
export class PlanEditComponent implements OnInit {
  show = false;
  fbs = inject(FirebaseService);
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);
  // @ts-ignore
  item: Partial<Plan> = undefined;
  // @ts-ignore
  group: Group;
  form!: FormGroup;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
      id: this.formBuilder.control(null),
      groupId: this.formBuilder.control(undefined),
      groupName: this.formBuilder.control(undefined),
      changedAt: this.formBuilder.control(undefined),
      from: this.formBuilder.control(undefined),
      to: this.formBuilder.control(undefined),
      createdAt: this.formBuilder.control(undefined),
      isNew: this.formBuilder.control(undefined),
      tenantId: this.formBuilder.control(undefined),
    })
  }

  open(item: Partial<Plan>) {
    this.item = _.cloneDeep(item);

    this.form.patchValue(this.item);
    this.show = true;
    if (this.item.groupId) {
      // @ts-ignore
      this.group = this.stateService.groups.find(g => g.id === this.item.groupId);
    }
  }

  apply() {
    if (this.item.name?.length === 0) {
      return;
    }
    // @ts-ignore
    this.group = this.stateService.groups.find(g => g.id === this.form.get('groupId').value);
    this.groupChange(this.group)
    this.onApply.emit(this.form.getRawValue());
  }

  groupChange(group: Group) {
    console.log('groupChange group', group)
    this.item.groupId = group.id;
    this.item.groupName = group.name;
    console.log('groupChange item', this.item)
  }

  modelChange(e: any) {
    const group = JSON.parse(e);
    //console.log('modelChange', group, group.id)
  }
}
