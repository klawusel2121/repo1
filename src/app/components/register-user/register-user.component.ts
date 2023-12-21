import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  tenantId: string = '';
  constructor(
    public authService: AuthService
  ) {
  }

  onRegister(email: string, password: string) {
    this.authService.Register(email, password);
  }
}
