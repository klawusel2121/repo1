import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";

export type Role = 'ADMIN' | 'USER';

export interface User extends HasId, HasTenant, HasTimestamps {
  name: string;
  role: Role;
  email: string;
}
