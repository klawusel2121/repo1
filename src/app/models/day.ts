import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";

export type Day = {
  number: number;
  open: boolean;
}

export type Days  = HasId & HasTenant & HasTimestamps & IsNew & {
  items: Array<Day>;
}
