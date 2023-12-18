import {Teacher} from "./teacher";
import {ScheduleItem} from "./schedule-item";

export interface Schedule {
  tenantId: string;
  teacher: Teacher;
  items: Array<ScheduleItem>;
}
