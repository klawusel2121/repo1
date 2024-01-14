import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {StateService} from "./services/state.service";
import {FirebaseService} from "./services/firebase.service";
import _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  stateService: StateService = inject(StateService);
  fbs: FirebaseService = inject(FirebaseService);
  country: any = this.stateService.countries[0];
  isCollapsed = false;
  tenantId: string = '';

  protected readonly localStorage = localStorage;

  constructor(
    public router: Router,
    private translate: TranslateService
  ) {
    const lang: string = localStorage.getItem('lang') ?? 'de-DE';
    this.translate.use(lang);
    translate.setDefaultLang(lang);
    translate.use(lang);
    this.tenantId = localStorage.getItem('tenant') as string
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      const email = userData?.email;
      const password = localStorage.getItem('password');
      console.log('app-init', user, userData, email, password);
      if (email && password) {
        this.authService.Login(email, password).then(() => {
          console.warn('logged in')
        });
      }
    }
  }

  signIn() {
    this.router.navigate(['sign-in'])
  }

  navigate(path: string, event: any) {
    event.preventDefault();
    if (!path) {
      return;
    }
    this.router.navigate([path]);
  }

  onLogout(event: any) {
    event.preventDefault();
    this.authService.Logout();
    this.router.navigate(['sign-in']);
  }

}
