import { Injectable } from '@angular/core';
import {
  UserCredential,
} from 'firebase/auth';
import {BehaviorSubject} from "rxjs";
@Injectable({
providedIn: 'root'
})
export class AuthService {
  userCredential: any;
  userCredential$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
