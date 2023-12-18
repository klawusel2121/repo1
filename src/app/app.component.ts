
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

    const email = this.authService.UserData?.email;
    const password = localStorage.getItem('password');
    if (email && password) {
      this.authService.Login(email, password);
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
}
