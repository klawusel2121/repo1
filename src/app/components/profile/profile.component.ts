import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import _ from "lodash";
import {StateService} from "../../services/state.service";
import {FirebaseService} from "../../services/firebase.service";
import {LessonType} from "../../models/lesson-type";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/user";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  stateService: StateService = inject(StateService);
  fbs: FirebaseService = inject(FirebaseService);
  translate = inject(TranslateService);
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  message = inject(NzMessageService);
  router = inject(Router);

  locales = [ 'de-DE', 'en-GB' ]
  form!: FormGroup;
  user: Partial<User> | undefined = {};

  protected readonly LessonType = LessonType;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control({ value: this.authService.UserData.email, disabled: true}),
      uid: this.formBuilder.control({ value: this.authService.UserData.uid, disabled: true}),
      lang: this.formBuilder.control(localStorage.getItem('lang')),
      role: this.formBuilder.control({ value: this.user?.role, disabled: true}),
      name: this.formBuilder.control(this.user?.name),
      id: this.formBuilder.control(this.user?.id),
    })
    this.form.get('lang')?.valueChanges.subscribe(lang => {
      localStorage.setItem('lang', lang);
      this.translate.use(lang);
    })
    this.fbs.getCollection('users').subscribe(users => {
      this.user = users.find(u => u.email === this.authService.UserData.email);
      console.log('user', this.user, users);
      this.form.get('role')?.setValue(this.user?.role);
      this.form.get('name')?.setValue(this.user?.name);
    })
  }

  showItems() {
    this.router.navigate(['items'])
  }

  changeLanguage(lang: any) {
    this.translate.use(lang)
  }

  lang(): string {
    return this.form?.get('lang')?.value;
  }

  apply() {
    console.log('user apply', this.user)
    this.fbs.update('users', this.user, { name: this.form.get('name')?.value}).then(data => {
      this.message.success(this.translate.instant('App.Message.SuccessSave'))
    });
  }
}
