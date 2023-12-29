import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";

export interface Lesson extends HasId, HasTenant, HasTimestamps, IsNew {
  position: number;
  name: string;
  from: string;
  to: string;
}
