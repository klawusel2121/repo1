import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {Grade} from "./grade";
import {IsNew} from "./is-new";

export interface Group  extends HasId, HasTenant, HasTimestamps, IsNew {
  name: string;
  grade: Grade;
}
