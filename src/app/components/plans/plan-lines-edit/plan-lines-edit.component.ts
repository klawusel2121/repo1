import {Component, Input} from '@angular/core';
import {PlanItem} from "../../../models/plan-item";

@Component({
  selector: 'app-plan-lines-edit',
  templateUrl: './plan-lines-edit.component.html',
  styleUrl: './plan-lines-edit.component.css'
})
export class PlanLinesEditComponent {
  @Input()  items!: Array<PlanItem>;

}
