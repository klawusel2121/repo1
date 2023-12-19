
import {Observable} from 'rxjs';
import {FirebaseService} from "./services/firebase.service";
import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  tenantId: string = '';
  constructor(
    public authService: AuthService,
    private router: Router
  ) {
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

  changeTenant(event: string) {
    this.authService.setTenant(event);
  }

  onClick(event: MouseEvent, route: string) {
    this.router.navigate([route])
  }

  protected readonly localStorage = localStorage;
}
