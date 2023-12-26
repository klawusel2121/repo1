/// math, physics, ...
import {HasTimestamps} from "./has-timestamps";
import {HasTenant} from "./has-tenant";
import {HasId} from "./has-id";

export interface Course extends HasId, HasTenant, HasTimestamps {
  name: string;
  isNew: boolean;
}
