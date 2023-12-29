import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";

export interface Day {
  number: number;
  open: boolean;
}

export interface Days extends HasId, HasTenant, HasTimestamps, IsNew {
  items: Array<Day>;
}
