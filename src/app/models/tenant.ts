import {HasId} from "./has-id";
import {HasTenant} from "./has-tenant";
import {HasTimestamps} from "./has-timestamps";
import {IsNew} from "./is-new";
import {TeacherCourse} from "./teacherCourse";

export interface Tenant extends HasId, HasTenant, HasTimestamps {
  name: string;
  country: string;
  zip: string;
  street: string;
}
