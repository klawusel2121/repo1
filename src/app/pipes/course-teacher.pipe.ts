import {inject, Pipe, PipeTransform} from '@angular/core';
import {StateService} from "../services/state.service";
import {PlanItem} from "../models/plan-item";

@Pipe({
  name: 'courseTeacher'
})
export class CourseTeacherPipe implements PipeTransform {
  stateService = inject(StateService);

  transform(v: any, courseId: string, teacherId: string): number {
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
