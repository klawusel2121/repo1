import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";
import {TeacherCourse} from "./teacherCourse";

export type Tenant = HasId & HasTenant & HasTimestamps & IsNew & {
  name: string;
  country: string;
  zip: string;
  street: string;
  city: string;
}
