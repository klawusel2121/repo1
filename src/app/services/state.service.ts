import { Injectable } from '@angular/core';
import {Grade} from "../models/grade";
import {Course} from "../models/course";
import {Room} from "../models/room";
import {Teacher} from "../models/teacher";
import {Group} from "../models/group";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  grades: Array<Grade> = [];
  courses: Array<Course> = [];
  rooms: Array<Room> = [];
  teachers: Array<Teacher> = [];
  groups: Array<Group> = [];

  grades$: BehaviorSubject<Array<Grade>> = new BehaviorSubject<Array<Grade>>(this.grades);
  courses$: BehaviorSubject<Array<Course>> = new BehaviorSubject<Array<Course>>(this.courses);
  rooms$: BehaviorSubject<Array<Room>> = new BehaviorSubject<Array<Room>>(this.rooms);
  teachers$: BehaviorSubject<Array<Teacher>> = new BehaviorSubject<Array<Teacher>>(this.teachers);
  groups$: BehaviorSubject<Array<Group>> = new BehaviorSubject<Array<Group>>(this.groups);
  constructor() { }
}
