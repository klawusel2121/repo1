import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";
import {LessonType} from "./lesson-type";

export interface Lesson extends HasId, HasTenant, HasTimestamps, IsNew {
  position: number;
  name: string;
  from: string;
  to: string;
  type: LessonType;
}
