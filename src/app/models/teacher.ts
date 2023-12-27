import {Course} from "./course";
import {HasTimestamps} from "./has-timestamps";
import {HasTenant} from "./has-tenant";
import {HasId} from "./has-id";
import {IsNew} from "./is-new";

export interface Teacher extends HasId, HasTenant, HasTimestamps, IsNew {
  name: string;
  subjects: Map<Course, Array<number>>
}
