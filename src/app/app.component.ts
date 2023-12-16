
import {Observable} from 'rxjs';
import {FirebaseService} from "./services/firebase.service";
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "./services/auth.service";
import { CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}
