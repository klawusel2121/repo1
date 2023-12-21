import {HasTimestamps} from "./has-timestamps";
import {HasTenant} from "./has-tenant";
import {HasId} from "./has-id";

export interface Grade extends HasId, HasTenant, HasTimestamps {
  name: string; // 1a
  level: number; // 1
}
