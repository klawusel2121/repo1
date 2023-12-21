import {Grade} from "./grade";
import {HasTimestamps} from "./has-timestamps";
import {HasTenant} from "./has-tenant";

export interface ScheduleItem extends HasTenant, HasTimestamps {
  grade: Grade;
  year?: number;
  week?: number;
  day: number;
  lesson: number;
  course: string;
}
