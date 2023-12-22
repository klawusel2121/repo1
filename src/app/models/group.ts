import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {Grade} from "./grade";

export interface Group  extends HasId, HasTenant, HasTimestamps{
  name: string;
  grade: Grade;
}
