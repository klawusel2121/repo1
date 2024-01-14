import {Course} from "./course";
import {HasTimestamps} from "./has-timestamps";
import {HasTenant} from "./has-tenant";
import {HasId} from "./has-id";
import {IsNew} from "./is-new";
import {TeacherCourse} from "./teacherCourse";

export type Teacher = HasId & HasTenant & HasTimestamps & IsNew & {
  name: string;
  short: string;
  courses: Array<Partial<TeacherCourse>>;
  deleteCourses: Array<string>;
}

