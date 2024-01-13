import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {StateService} from "../../services/state.service";
import {PlanItem} from "../../models/plan-item";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LessonType} from "../../models/lesson-type";
import {Teacher} from "../../models/teacher";
import {Course} from "../../models/course";
import {Plan} from "../../models/plan";

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class EvaluationComponent implements OnInit {
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);

  activePlans = this.stateService.plans.filter(p => p.active);
  normalCourses = this.stateService.courses.filter(c => c.type === LessonType.normal);
  breakCourses = this.stateService.courses.filter(c => c.type === LessonType.break);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      courseIds: this.formBuilder.control(undefined),
      planIds: this.formBuilder.control(undefined),
      courseGroup: this.formBuilder.control(undefined),
    })
    console.log('oninit', this.normalCourses, this.activePlans)
    this.form.get('courseGroup')!.setValue(LessonType.normal);
    this.form.get('courseIds')!.setValue(this.normalCourses.map(i => i.id));
    this.form.get('planIds')!.setValue(this.activePlans.map(i => i.id));
    this.form.get('courseGroup')?.valueChanges.subscribe(
      type => {
        this.courseGroupChange(type);
      }
    );
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

  plans(): Array<Plan> {
    return this.stateService.plans
      .filter(t => this.form.get('planIds')!.value.indexOf(t.id) !== -1);
  }

  courseNames(): string {
    return this.courses().map(c => c.name).join(',');
  }

  planNames(): string {
    return this.plans().map(c => c.name).join(',');
  }

courseGroupChange(type: LessonType) {
  switch(type) {
      case LessonType.normal:
        this.form.get('courseIds')!.setValue(this.normalCourses.map(i => i.id));
        break;
      case LessonType.break:
        this.form.get('courseIds')!.setValue(this.breakCourses.map(i => i.id));
        console.log('courseGroupChange', type, this.form.get('courseIds')?.value, this.breakCourses)
        break;
      case LessonType.all:
        this.form.get('courseIds')!.setValue(this.stateService.courses.map(i => i.id));
        break;
    }
  }

  protected readonly LessonType = LessonType;
}
