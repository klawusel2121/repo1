import {AfterViewInit, Component, inject} from '@angular/core';
import {StateService} from "../../services/state.service";
import {FirebaseService} from "../../services/firebase.service";
import {Day} from "../../models/day";
import {FormBuilder} from "@angular/forms";
import {FormHelperService} from "../../services/form-helper.service";
import {TranslateService} from "@ngx-translate/core";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrl: './days.component.css'
})
export class DaysComponent {
  fbs = inject(FirebaseService);
  formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);
  stateService = inject(StateService);
  translate = inject(TranslateService);
  message = inject(NzMessageService);

  items: Array<Day> = [];
  source = 'days';
  days = [ 1,2,3,4,5,6,0 ];
  active: Array<boolean> = [];

  btn1: boolean = true;
  btn2: boolean = false;

  constructor(
  ) {
    this.items = this.stateService.days[0]?.items ?? [];
    console.log('ctor', this.stateService.days, this.items)
    if (this.items.length !== 0) {
      this.active = this.items.sort((a,b) => a.number - b.number).map(d => d.open);
    } else {
      this.days.forEach(day => {
        this.active.push(true);
      });
      this.active[6] = false;
      this.active[0] = false;
    }
  }

  apply() {
    console.log('apply', this.items, this.days, this.active)
    if (this.items.length === 0) {
      this.days.forEach((day, index) => {
        this.items.push({ number: day, open: this.active[index]});
      })
      this.fbs.add(this.source, {items: this.items});
    } else {
      this.active.forEach((active, index) => {
        this.items[index].open = active;
      })
      this.fbs.update(this.source, this.stateService.days[0], {items: this.items}).then(data => {
        this.message.success(this.translate.instant('App.Message.SuccessSave'))
      });
    }

  }
}
