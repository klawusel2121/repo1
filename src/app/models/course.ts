/// math, physics, ...
import {HasTimestamps} from "./has-timestamps";
import {HasTenant} from "./has-tenant";
import {HasId} from "./has-id";
import {IsNew} from "./is-new";
import {CoursePerWeek} from "./coursePerWeek";

export interface Course extends HasId, HasTenant, HasTimestamps, IsNew {
  name: string;
  weeklyHours: Array<Partial<CoursePerWeek>>;
  deleteHours: Array<string>;
}

