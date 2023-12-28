import {Group} from "./group";
import {Teacher} from "./teacher";
import {Course} from "./course";

export interface PlanLine {
  day: number;
  slot: number;
  group: Group;
  course: Course;
  teacher: Teacher;
}
