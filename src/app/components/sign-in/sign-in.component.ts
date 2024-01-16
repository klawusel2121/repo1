import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../services/form-helper.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  passwordVisible = false;
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);
  authService = inject(AuthService);

  tenantIds: Array<string> = [];
  form!: FormGroup;
  index = 0;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: this.formBuilder.control(undefined),
      password: this.formBuilder.control(undefined),
      tenantId: this.formBuilder.control(localStorage.getItem('tenant')),
    })
    const tenantIds = localStorage.getItem('tenant-list');
    if (tenantIds) {
      this.tenantIds = tenantIds.split(',');
    }
  }

  onLogin() {
    this.authService.setTenant(this.form.get('tenantId')?.value);
    this.authService.Login(this.form.get('userName')?.value, this.form.get('password')?.value)
  }

  search(e: string) {
    console.log('search', e)
  }

  enter(e: any) {
    console.log('enter', e)
    this.form.get('tenantId')?.setValue(e);
  }

  addTenant(input: HTMLInputElement): void {
    const value = input.value;
    if (this.tenantIds.indexOf(value) === -1) {
      this.tenantIds = [...this.tenantIds, input.value || `New item ${this.index++}`];
    }
  }
}
