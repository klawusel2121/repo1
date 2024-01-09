import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {StateService} from "../../../services/state.service";
import {PlanEditComponent} from "../plan-edit/plan-edit.component";
import {Cell} from "../plan-cell-edit/plan-cell-edit.component";
import {PlanItem} from "../../../models/plan-item";

@Component({
  selector: 'app-plan-cells-edit',
  templateUrl: './plan-cells-edit.component.html',
  styleUrl: './plan-cells-edit.component.css'
})
export class PlanCellsEditComponent {
  stateService = inject(StateService);

  @Input()  planEditComponent!: PlanEditComponent;
  @Output() onEditCell: EventEmitter<Partial<Cell>> = new EventEmitter<Partial<Cell>>();
  @Output() onRemoveCell = new EventEmitter<Partial<Cell>>();

  days = this.stateService.days;
  lessons = this.stateService.lessons;
  openDays = this.days[0].items.filter(i => i.open);
}
