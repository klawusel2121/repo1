import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";
import {PlanItem} from "./plan-item";

export interface Plan extends HasId, HasTenant, HasTimestamps, IsNew {
  name: string;
  groupId: string;
  groupName: string;
  from: Date;
  to: Date;
  items: Array<Partial<PlanItem>>;
}
