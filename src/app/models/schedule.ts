import {Teacher} from "./teacher";
import {ScheduleItem} from "./schedule-item";
import {HasTimestamps} from "./has-timestamps";
import {HasTenant} from "./has-tenant";

export interface Schedule extends HasTenant, HasTimestamps {
  teacher: Teacher;
  items: Array<ScheduleItem>;
}
