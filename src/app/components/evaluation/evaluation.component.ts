import {Component, inject, OnInit} from '@angular/core';
import {StateService} from "../../services/state.service";
import {PlanItem} from "../../models/plan-item";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LessonType} from "../../models/lesson-type";
import {Teacher} from "../../models/teacher";
import {Course} from "../../models/course";

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent implements OnInit {
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);

  activePlans = this.stateService.plans.filter(p => p.active);
  normalCourses = this.stateService.courses.filter(c => c.type === LessonType.normal);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      courseIds: this.formBuilder.control(undefined),
      planIds: this.formBuilder.control(undefined),
    })
    console.log('oninit', this.normalCourses, this.activePlans)
    this.form.get('courseIds')!.setValue(this.normalCourses.map(i => i.id))
    this.form.get('planIds')!.setValue(this.activePlans.map(i => i.id))
  }

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

  planIds(): Array<string> {
    return this.form.get('planIds')?.value ?? [];
  }

  teachers(): Array<Teacher> {
    return this.stateService.teachers
      .filter(t => this.form.get('teacherIds')!.value.indexOf(t.id) !== -1);
  }

  courses(): Array<Course> {
    return this.stateService.courses
      .filter(t => this.form.get('courseIds')!.value.indexOf(t.id) !== -1);
  }
}
