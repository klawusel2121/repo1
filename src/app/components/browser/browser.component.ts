import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormHelperService} from "../../services/form-helper.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {TranslateService} from "@ngx-translate/core";
import {StateService} from "../../services/state.service";
import {BehaviorSubject} from "rxjs";

export enum BrowserModes {
  room = 'room',
  group = 'group',
  teacher = 'teacher'
}

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.css'
})
export class BrowserComponent implements OnInit {
  Modes = BrowserModes;

  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);
  message = inject(NzMessageService);
  translate = inject(TranslateService);
  stateService = inject(StateService);

  id$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  form!: FormGroup;
  itemCount = 0;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      mode: this.formBuilder.control(undefined),
      groupId: this.formBuilder.control(undefined),
      teacherId: this.formBuilder.control(undefined),
      roomId: this.formBuilder.control(undefined),
    })
    this.form.patchValue({ mode : BrowserModes.teacher})
    this.form.get('teacherId')?.valueChanges?.subscribe(value => {
      this.itemCount = 0;
      this.id$.next(value);
    });
    this.form.get('groupId')?.valueChanges?.subscribe(value => {
      this.itemCount = 0;
      this.id$.next(value);
    });
    this.form.get('roomId')?.valueChanges?.subscribe(value => {
      this.itemCount = 0;
      this.id$.next(value);
    });
  }
}
