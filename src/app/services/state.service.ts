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
  constructor() { }
}
