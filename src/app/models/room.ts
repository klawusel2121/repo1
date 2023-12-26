import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";

export interface Room extends HasId, HasTenant, HasTimestamps {
  name: string;
  size: number;
  isNew: boolean;
}
