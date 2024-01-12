import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor() { }

  addDefaultControls(form: FormGroup, formBuilder: FormBuilder) {
    form.addControl('id', formBuilder.control(null))
    form.addControl('changedAt', formBuilder.control(null))
    form.addControl('createdAt', formBuilder.control(null))
    form.addControl('isNew', formBuilder.control(null))
    form.addControl('tenantId', formBuilder.control(null))
  }

  dateFormat = 'dd.MM.yyyy'
}
