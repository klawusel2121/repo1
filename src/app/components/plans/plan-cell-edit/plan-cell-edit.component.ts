import {Component, EventEmitter, inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {PlanEditComponent} from "../plan-edit/plan-edit.component";
import {StateService} from "../../../services/state.service";

export interface Cell {
  day: number;
  lesson: number;
  teacherId: string;
  courseId: string;
  roomId: string;
}

@Component({
  selector: 'app-plan-cell-edit',
  templateUrl: './plan-cell-edit.component.html',
  styleUrl: './plan-cell-edit.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PlanCellEditComponent implements OnInit {

  @Input() c!: number;
  @Input() r!: number;
  @Input() planEditComponent!: PlanEditComponent;
  @Output() onEditCell: EventEmitter<Partial<Cell>> = new EventEmitter<Partial<Cell>>();
  stateService = inject(StateService);
  cell!: Partial<Cell>;

  ngOnInit(): void {
    this.cell = {
      day: this.c,
      lesson: this.r,
    }
  }
}
