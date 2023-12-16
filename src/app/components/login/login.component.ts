import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FirebaseService} from "../../services/firebase.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    public fbs: FirebaseService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.cookieService.get('email'),
      password: ''
    });
  }

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
