import {Grade} from "./grade";
import {Course} from "./course";

export interface Teacher {
  tenantId: string;
  name: string;
  subjects: Map<Course, Array<Grade>>
}
