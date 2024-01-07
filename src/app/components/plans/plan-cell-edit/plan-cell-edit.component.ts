import {Component, EventEmitter, inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {PlanEditComponent} from "../plan-edit/plan-edit.component";
import {StateService} from "../../../services/state.service";
import {PlanItem} from "../../../models/plan-item";

export interface Cell {
  day: number;
  lesson: number;
  teacherId: string;
  teacherIds: Array<string>;
  teacherShort?: string;
  courseId: string;
  courseName?: string;
  roomId: string;
  roomName?: string;
  invalidRoom: boolean;
  invalidTeacher: boolean;
}


@Component({
  selector: 'app-plan-cell-edit',
  templateUrl: './plan-cell-edit.component.html',
  styleUrl: './plan-cell-edit.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PlanCellEditComponent implements OnInit {
  stateService = inject(StateService);
  @Input() c!: number;
  @Input() r!: number;
  @Input() items!: Array<Partial<PlanItem>>;
  @Input() planEditComponent!: PlanEditComponent;
  @Output() onEditCell: EventEmitter<Partial<Cell>> = new EventEmitter<Partial<Cell>>();
  @Output() onRemoveCell = new EventEmitter<Partial<Cell>>();
  cell!: Partial<Cell>;
  invalid = false;
  invalidText = '';

  ngOnInit(): void {
    const room = this.stateService.rooms
      .find(r => r.id === this.planEditComponent.form.get('groupId')?.value);
    const item = this.items.find(i => i.day === this.c && i.lesson === this.r);

    this.cell = {
      day: this.c,
      lesson: this.r,
      roomId: item?.roomId,
      roomName: this.stateService.rooms.find(r => r.id === item?.roomId)?.name,
      courseId: item?.courseId,
      courseName: this.stateService.courses.find(r => r.id === item?.courseId)?.name,
      teacherIds: item?.teacherIds ?? [],
      teacherShort: this.stateService.teachers.filter(r => (item?.teacherIds ?? []).indexOf(r.id!) !== -1 ).map(i => i.short).join(','),
      invalidRoom: false,
      invalidTeacher: false,
    }

    this.planEditComponent.active$
      .subscribe(active => this.checkValidity(this.cell))
  }

  editCell(param: { courseId?: string, roomId?: string, teacherIds?: Array<string> }) {
    if (param.courseId) {
      this.cell.courseId = param.courseId;
      if (!this.cell.roomId) {
        this.cell.roomId = this.stateService.groups.find(g => g.id === this.planEditComponent.form.get('groupId')?.value)?.roomId;
      }
    }
    if (param.roomId) {
      this.cell.roomId = param.roomId;
    }
    if (param.teacherIds) {
      this.cell.teacherIds = param.teacherIds;
      if (!this.cell.roomId) {
        this.cell.roomId = this.stateService.groups.find(g => g.id === this.planEditComponent.form.get('groupId')?.value)?.roomId;
      }
    }
    const active = this.planEditComponent.form.get('active')?.value ?? false;
    this.checkValidity(this.cell);
    this.onEditCell.emit(this.cell);
  }

  removeCell(cell: Partial<Cell>) {
    this.cell.courseId = undefined;
    this.cell.roomId = undefined;
    this.cell.teacherIds = [];
    this.checkValidity(cell);
    this.onRemoveCell.emit(cell);
  }

  private checkValidity(cell: Partial<Cell>) {
    if (!cell) {
      return;
    }
    const planId = this.planEditComponent.form.get('id')?.value;
    const active = this.planEditComponent.form.get('active')?.value;
    // console.log('checkValidity', active)
    cell.invalidRoom = false;
    cell.invalidTeacher = false;
    this.onEditCell.emit(cell);
    if (!active) {
      return;
    }
    this.stateService.plans
      .filter(plan => (planId ? plan.id !== planId : true) && plan.active)
      .forEach(plan => {
        plan.items
          .filter(item => item.day === cell.day && item.lesson === cell.lesson)
          .forEach(item => {
            if (item.roomId == cell.roomId) {
              // console.warn('invalid room')
              cell.invalidRoom = true;
              this.onEditCell.emit(cell);
            }
            if (this.intersect(item.teacherIds!, cell.teacherIds!).length > 0) {
              // console.warn('invalid teacher')
              cell.invalidTeacher = true;
              this.onEditCell.emit(cell);
            }
        });
    });
  }
  private intersect(a: Array<string>, b: Array<string>) {
    var setB = new Set(b);
    return [...new Set(a)].filter(x => setB.has(x));
  }
}
