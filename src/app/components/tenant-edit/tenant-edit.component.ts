import {Component, OnInit, inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../services/form-helper.service";
import {StateService} from "../../services/state.service";
import {FirebaseService} from "../../services/firebase.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {TranslateService} from "@ngx-translate/core";

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

  show = false;
  form!: FormGroup;

  ngOnInit(): void {
    console.log('state', this.stateService)
    const tenant = this.stateService.tenants[0];
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(undefined),
      country: this.formBuilder.control(undefined),
      zip: this.formBuilder.control(undefined),
      city: this.formBuilder.control(undefined),
      street: this.formBuilder.control(undefined),
      tenantId: this.formBuilder.control({value: undefined, disabled: true}),
    })
    this.formHelper.addDefaultControls(this.form, this.formBuilder);
    this.form.patchValue(tenant);
  }

  apply() {
    const tenant = this.form.getRawValue();
    this.fbs.update('tenants', this.stateService.tenants[0], tenant).then(data => {
      this.message.success(this.translate.instant('App.Message.SuccessSave'))
    });
  }
}
