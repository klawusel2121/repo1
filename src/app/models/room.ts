import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";

export type Room  = HasId & HasTenant & HasTimestamps & IsNew & {
  name: string;
  size: number;
}
