import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  tenantId: string = '';
  constructor(public authService: AuthService) { }

  ngOnInit(): void {}

  onLogin(email: string, password: string) {
    this.authService.Login(email, password)
  }
}
