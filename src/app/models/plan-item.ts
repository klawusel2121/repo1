import {Group} from "./group";
import {Teacher} from "./teacher";
import {Course} from "./course";
import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";

export interface PlanItem extends IsNew {
  day: number;
  lesson: number;
  courseId: string;
  teacherId: string;
  roomId: string;
}
