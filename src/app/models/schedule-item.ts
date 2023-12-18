import {Grade} from "./grade";

export interface ScheduleItem {
  tenantId: string;
  grade: Grade;
  year?: number;
  week?: number;
  day: number;
  lesson: number;
  course: string;
}
