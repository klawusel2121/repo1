import {IsNew} from "./is-new";

export type PlanItem = IsNew & {
  day: number;
  lesson: number;
  courseId: string;
  teacherIds: Array<string>;
  roomId: string;
  invalidRoom: boolean;
  invalidTeacher: boolean;
}
