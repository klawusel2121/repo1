import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";
import {PlanItem} from "./plan-item";

export type Plan  = HasId & HasTenant & HasTimestamps & IsNew & {
  name: string;
  groupId: string;
  groupName: string;
  active: boolean;
  items: Array<Partial<PlanItem>>;
}
