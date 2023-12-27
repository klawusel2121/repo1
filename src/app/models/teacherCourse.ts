import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";
import {Course} from "./course";
import {Teacher} from "./teacher";

export interface TeacherCourse extends HasId, HasTenant, HasTimestamps, IsNew {
  teacher: Teacher;
  course: Course;
  levels: Array<number>;
}
