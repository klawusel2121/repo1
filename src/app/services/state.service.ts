import { Injectable } from '@angular/core';
import {Grade} from "../models/grade";
import {Course} from "../models/course";
import {Room} from "../models/room";
import {Teacher} from "../models/teacher";
import {Group} from "../models/group";
import {BehaviorSubject} from "rxjs";
import {CoursePerWeek} from "../models/coursePerWeek";
import {TeacherCourse} from "../models/teacherCourse";
import {Lesson} from "../models/lesson";
import {Plan} from "../models/plan";
import {Days} from "../models/day";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  grades: Array<Grade> = [];
  courses: Array<Course> = [];
  rooms: Array<Room> = [];
  teachers: Array<Teacher> = [];
  groups: Array<Group> = [];
  coursesPerWeek: Array<CoursePerWeek> = [];
  teacherCourses: Array<TeacherCourse> = [];
  lessons: Array<Lesson> = [];
  plans: Array<Plan> = [];
  days: Array<Days> = [];

  grades$: BehaviorSubject<Array<Grade>> = new BehaviorSubject<Array<Grade>>(this.grades);
  courses$: BehaviorSubject<Array<Course>> = new BehaviorSubject<Array<Course>>(this.courses);
  rooms$: BehaviorSubject<Array<Room>> = new BehaviorSubject<Array<Room>>(this.rooms);
  teachers$: BehaviorSubject<Array<Teacher>> = new BehaviorSubject<Array<Teacher>>(this.teachers);
  groups$: BehaviorSubject<Array<Group>> = new BehaviorSubject<Array<Group>>(this.groups);
  coursesPerWeek$: BehaviorSubject<Array<CoursePerWeek>> = new BehaviorSubject<Array<CoursePerWeek>>(this.coursesPerWeek);
  teacherCourses$: BehaviorSubject<Array<TeacherCourse>> = new BehaviorSubject<Array<TeacherCourse>>(this.teacherCourses);
  lessons$: BehaviorSubject<Array<Lesson>> = new BehaviorSubject<Array<Lesson>>(this.lessons);
  plans$: BehaviorSubject<Array<Plan>> = new BehaviorSubject<Array<Plan>>(this.plans);
  days$: BehaviorSubject<Array<Days>> = new BehaviorSubject<Array<Days>>(this.days);

  constructor() { }
}
