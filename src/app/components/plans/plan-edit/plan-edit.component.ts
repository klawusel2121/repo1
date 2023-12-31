import {Component, EventEmitter, inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {StateService} from "../../../services/state.service";
import {Plan} from "../../../models/plan";
import _ from "lodash";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../../services/form-helper.service";
import {Cell} from "../plan-cell-edit/plan-cell-edit.component";
import {PlanItem} from "../../../models/plan-item";
import {BehaviorSubject} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrl: './plan-edit.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PlanEditComponent implements OnInit {
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);
  message = inject(NzMessageService);
  translate = inject(TranslateService);

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  show = false;
  form!: FormGroup;
  messageId: string = '';
  cell!: Partial<Cell>;
  items: Array<Partial<PlanItem>> = [];
  active$ = new BehaviorSubject<boolean>(false)

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
      active: this.formBuilder.control(undefined),
      groupId: this.formBuilder.control(undefined),
      groupName: this.formBuilder.control(undefined),
      from: this.formBuilder.control(undefined),
      to: this.formBuilder.control(undefined),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
    this.form.get('groupId')?.valueChanges.pipe().subscribe(id => {
      this.form.get('groupName')?.setValue(this.stateService.groups
        .find(g => g.id === id)?.name);
    })
    this.form.get('active')?.valueChanges.pipe().subscribe(value => {
      this.active$.next(value);
    })
  }

  open(item: Partial<Plan>) {
    this.messageId = this.message.loading(this.translate.instant('App.Message.Loading'), { nzDuration: 0 }).messageId;

    setTimeout(() => {
      if (!('active' in item)) {
        item.active = false;
      }
      if (item.active) {
        this.active$.next(true);
      }
      this.form.patchValue(_.cloneDeep(item));
      this.items = _.cloneDeep(this.stateService.plans.find(p => p.id == item.id)?.items) ?? [];
      this.show = true;
      this.message.remove(this.messageId);
    })
  }

  apply() {
    const item = this.form.getRawValue();
    if (this.items.filter(item => item.invalidTeacher || item.invalidRoom).length > 0) {
      return;
    }
    item.items = this.items.filter(item => item.roomId && item.courseId && item.teacherIds!.length > 0);
    item.items.forEach((item: any) => {
      delete item.invalidRoom;
      delete item.invalidTeacher;
    })
    console.log('edit apply', item)

    if (item.name?.length === 0) {
      return;
    }
    const group = this.stateService.groups.find(g => g.id === item.groupId);
    if (group) {
      this.form.get('groupId')?.setValue(group.id) ;
      this.form.get('groupName')?.setValue(group.name) ;
    }

    this.onApply.emit(item);
  }

  onEditCell(cell: Partial<Cell>) {
    console.log('cell', cell)
    this.cell = cell;
    let item = this.items.find(i => i.day == cell.day && i.lesson == cell.lesson);
    if (!item) {
      item = { day: cell.day, lesson: cell.lesson};
      this.items.push(item);
    }
    item.courseId = cell.courseId;
    item.roomId = cell.roomId;
    item.teacherIds = cell.teacherIds;
    item.invalidRoom = cell.invalidRoom;
    item.invalidTeacher = cell.invalidTeacher;
  }

  onRemoveCell(cell: Partial<Cell>) {
    const index = this.items.findIndex(i => i.day == cell.day && i.lesson == cell.lesson);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  onActiveChange(active: boolean) {
    this.form.get('active')?.setValue(active);
    this.active$.next(active);
  }

  groupName(): string {
    return this.form.get('groupName')?.value ?? '';
  }

  tenantInfo(): string {
    const tenant = this.stateService.tenants[0];
    return `${tenant.name} : ${tenant.street}, ${tenant.country}-${tenant.zip} ${tenant.city}`

  }

  cancel() {
    this.onCancel.emit();
  }
}
