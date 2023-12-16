
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

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn() {
    this.router.navigate(['sign-in'])
  }

  items() {
    this.router.navigate(['items'])
  }
}
