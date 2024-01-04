import {Component, EventEmitter, inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {PlanEditComponent} from "../plan-edit/plan-edit.component";
import {StateService} from "../../../services/state.service";
import {PlanItem} from "../../../models/plan-item";

export interface Cell {
  day: number;
  lesson: number;
  teacherId: string;
  courseId: string;
  roomId: string;
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
      courseId: item?.courseId,
      teacherId: item?.teacherId,
      invalidRoom: false,
      invalidTeacher: false,
    }
  }

  editCell(param: { courseId?: string, roomId?: string, teacherId?: string }) {
    if (param.courseId) {
      this.cell.courseId = param.courseId;
      if (!this.cell.roomId) {
        this.cell.roomId = this.stateService.groups.find(g => g.id === this.planEditComponent.form.get('groupId')?.value)?.roomId;
      }
    }
    if (param.roomId) {
      this.cell.roomId = param.roomId;
    }
    if (param.teacherId) {
      this.cell.teacherId = param.teacherId;
      if (!this.cell.roomId) {
        this.cell.roomId = this.stateService.groups.find(g => g.id === this.planEditComponent.form.get('groupId')?.value)?.roomId;
      }
    }
    this.checkValidity(this.cell);
    this.onEditCell.emit(this.cell);
  }

  removeCell(cell: Partial<Cell>) {
    this.cell.courseId = undefined;
    this.cell.roomId = undefined;
    this.cell.teacherId = undefined;
    this.onRemoveCell.emit(cell);
  }

  private checkValidity(cell: Partial<Cell>) {
    const planId = this.planEditComponent.form.get('id')?.value;
    cell.invalidRoom = false;
    cell.invalidTeacher = false;
    this.stateService.plans
      .filter(plan => planId ? plan.id !== planId : true)
      .forEach(plan => {
        plan.items
          .filter(item => item.day === cell.day && item.lesson === cell.lesson)
          .forEach(item => {
            if (item.roomId == cell.roomId) {
              cell.invalidRoom = true;
            }
            if (item.teacherId == cell.teacherId) {
              cell.invalidTeacher = true;
            }
        });
    });
    return false;
  }
}
