import {Course} from "./course";
import {HasTimestamps} from "./has-timestamps";
import {HasTenant} from "./has-tenant";
import {HasId} from "./has-id";

export interface Teacher extends HasId, HasTenant, HasTimestamps  {
  name: string;
  subjects: Map<Course, Array<number>>
}
