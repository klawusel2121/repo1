import {IsNew} from "./is-new";

export interface PlanItem extends IsNew {
  day: number;
  lesson: number;
  courseId: string;
  teacherIds: Array<string>;
  roomId: string;
  invalidRoom: boolean;
  invalidTeacher: boolean;
}
