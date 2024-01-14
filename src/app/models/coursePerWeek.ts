import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";
import {Course} from "./course";

export type CoursePerWeek  = HasId & HasTenant & HasTimestamps & IsNew & {
  courseId: string;
  level: number;
  hours: number;
  groupName: string;
  groupId: string;
  edit?: boolean;
  backup?: Partial<CoursePerWeek>;
}
