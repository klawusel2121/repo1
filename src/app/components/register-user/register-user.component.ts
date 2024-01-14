import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../services/form-helper.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  passwordVisible = false;
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);
  authService = inject(AuthService);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: this.formBuilder.control(undefined),
      password: this.formBuilder.control(undefined),
      tenantId: this.formBuilder.control(localStorage.getItem('tenant')),
    })
  }

  onRegister() {
    this.authService.setTenant(this.form.get('tenantId')?.value);
    this.authService.Register(this.form.get('userName')?.value, this.form.get('password')?.value)
  }
}
