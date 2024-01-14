import {HasTimestamps} from "./has-timestamps";
import {HasTenant} from "./has-tenant";
import {HasId} from "./has-id";
import {IsNew} from "./is-new";

export type Grade = HasId & HasTenant & HasTimestamps & IsNew & {
  name: string; // 1a
  level: number; // 1
}
