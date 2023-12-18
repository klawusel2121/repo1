import {Course} from "./course";

export interface Teacher {
  tenantId: string;
  name: string;
  subjects: Map<Course, Array<number>>
}
