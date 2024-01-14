/// math, physics, ...
import {HasTimestamps} from "./has-timestamps";
import {HasTenant} from "./has-tenant";
import {HasId} from "./has-id";
import {IsNew} from "./is-new";
import {CoursePerWeek} from "./coursePerWeek";
import {LessonType} from "./lesson-type";

export type Course = HasId & HasTenant & HasTimestamps & IsNew & {
  name: string;
  type: LessonType;
  weeklyHours: Array<Partial<CoursePerWeek>>;
  deleteHours: Array<string>;
}

