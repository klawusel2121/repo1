import {Component, inject} from '@angular/core';
import {StateService} from "../../services/state.service";
import {PlanItem} from "../../models/plan-item";

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent {
  stateService = inject(StateService);

  courseTeacher(courseId: string, teacherId: string): number {
    const plans = this.stateService.plans
      .filter(plan => plan.active);
    let items: Array<Partial<PlanItem>> = [];
    plans.forEach(plan => {
      const planItems = plan.items;
      items.push(...plan.items);
    })
    return items.filter(item => item.courseId === courseId && item.teacherIds?.indexOf(teacherId) !== -1).length;

  }
}
