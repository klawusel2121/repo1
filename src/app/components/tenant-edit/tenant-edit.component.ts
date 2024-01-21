import {Component, OnInit, inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../services/form-helper.service";
import {StateService} from "../../services/state.service";
import {FirebaseService} from "../../services/firebase.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-tenant-edit',
  templateUrl: './tenant-edit.component.html',
  styleUrl: './tenant-edit.component.css'
})
export class TenantEditComponent implements OnInit {
  fbs = inject(FirebaseService);
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);
  stateService = inject(StateService);
  translate = inject(TranslateService);
  message = inject(NzMessageService);
  authService = inject(AuthService);

  show = false;
  form!: FormGroup;

  ngOnInit(): void {
    console.log('state', this.stateService, this.authService.UserData)
    const tenant = {...this.stateService.tenants[0], tenantId: localStorage.getItem('tenant')};

    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
      country: this.formBuilder.control(undefined),
      zip: this.formBuilder.control(undefined),
      city: this.formBuilder.control(undefined),
      street: this.formBuilder.control(undefined),
      tenantId: this.formBuilder.control({value: undefined, disabled: true}),
      email: this.formBuilder.control({value: this.authService.UserData.email, disabled: true}),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
    this.form.patchValue(tenant);
  }

  apply() {
    const tenant = this.form.getRawValue();
    if (tenant.id) {
      this.fbs.update('tenants', this.stateService.tenants[0], tenant).then(data => {
        this.message.success(this.translate.instant('App.Message.SuccessSave'))
      });
    } else {
      this.fbs.add('tenants', tenant).then(data => {
        const items$ = this.fbs.getCollection('tenants');
        items$.pipe().subscribe(items => {
          this.stateService.tenants = items;
          this.stateService.tenants$.next(this.stateService.tenants);
        })
      })
    }

  }
}
