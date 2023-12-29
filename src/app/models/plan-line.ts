import {Group} from "./group";
import {Teacher} from "./teacher";
import {Course} from "./course";

export interface PlanLine {
  day: number;
  lesson: number;
  group: Group;
  course: Course;
  teacher: Teacher;
}
