import {inject, Pipe, PipeTransform} from '@angular/core';
import {StateService} from "../services/state.service";
import {PlanItem} from "../models/plan-item";

@Pipe({
  name: 'sumTeacher'
})
export class SumTeacherPipe implements PipeTransform {

  stateService = inject(StateService);

  transform(teacherId: string, planIds: Array<string>): number {
    const plans = this.stateService.plans
      .filter(plan => plan.active && planIds.indexOf(plan.id!) !== -1);
    let items: Array<Partial<PlanItem>> = [];
    plans.forEach(plan => {
      const planItems = plan.items;
      items.push(...plan.items);
    })
    return items.filter(item => item.teacherIds?.indexOf(teacherId) !== -1).length;
  }
}
