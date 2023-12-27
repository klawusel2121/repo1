import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";
import {Course} from "./course";

export interface CourseWeek extends HasId, HasTenant, HasTimestamps, IsNew {
  course: Course;
  level: number;
  hours: number;
}
