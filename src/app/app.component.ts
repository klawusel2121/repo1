
import {Observable} from 'rxjs';
import {FirebaseService} from "./firebase.service";
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "./state/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  items$: Observable<any[]>;
  loginForm!: FormGroup;

  constructor(
    private fbs: FirebaseService,
    private formBuilder: FormBuilder,
    public authState: AuthService,
  ) {
    this.items$ = this.fbs.getCollection('items');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  add() {
    this.fbs.add('items', {desc: 'DESC1', date: new Date()})
  }

  remove(item: any) {
    this.fbs.remove('items', item.id);
  };

  update(item: any) {
    this.fbs.update('items', item, {date: new Date()});
  };

  signIn() {
    if (!this.loginForm?.get('email')?.value) {
      return;
    }
    if (!this.loginForm.get('password')?.value) {
      return;
    }
    this.fbs.singInUser(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
  }
  signUp() {
    if (!this.loginForm?.get('email')?.value) {
      return;
    }
    if (!this.loginForm.get('password')?.value) {
      return;
    }
    this.fbs.singUpUser(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
  }
}
