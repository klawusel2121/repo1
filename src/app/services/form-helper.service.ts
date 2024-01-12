import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {
  message = inject(NzMessageService);
  translate = inject(TranslateService);

  constructor() { }

  addDefaultControls(form: FormGroup, formBuilder: FormBuilder) {
    form.addControl('id', formBuilder.control(null))
    form.addControl('changedAt', formBuilder.control(null))
    form.addControl('createdAt', formBuilder.control(null))
    form.addControl('isNew', formBuilder.control(null))
    form.addControl('tenantId', formBuilder.control(null))
  }

  missingFieldMessage(key: string): void {
    const field = this.translate.instant(key);
    const text = this.translate.instant('App.Message.ErrorFieldMissing', { field: field})
    this.message.error(text);
  }

  dateFormat = 'dd.MM.yyyy'
}
