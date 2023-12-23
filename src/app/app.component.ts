
import {Observable} from 'rxjs';
import {FirebaseService} from "./services/firebase.service";
import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {Course} from "./models/course";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  tenantId: string = '';
  constructor(
    public authService: AuthService,
    public router: Router,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en-GB');
    translate.use('en-GB');
    this.tenantId = localStorage.getItem('tenant') as string
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const c: Course = { name: '1', tenantId: '2'}
      const userData = JSON.parse(user);
      const email = userData?.email;
      const password = localStorage.getItem('password');
      console.log('app-init', user, userData, email, password);
      if (email && password) {
        this.authService.Login(email, password);
      }
    }

  }

  signIn() {
    this.router.navigate(['sign-in'])
  }

  items() {
    this.router.navigate(['items'])
  }

  navigate(path: string, event: any) {
    event.preventDefault();
    if (!path) {
      return;
    }
    this.router.navigate([path]);
  }

  changeTenant(event: string) {
    this.authService.setTenant(event);
  }

  protected readonly localStorage = localStorage;

  onLogout(event: any) {
    event.preventDefault();
    this.authService.Logout();
    this.router.navigate(['sign-in']);
  }
}
