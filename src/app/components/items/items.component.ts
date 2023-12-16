import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  items$: Observable<any[]>;

  constructor(
    private fbs: FirebaseService,
    private formBuilder: FormBuilder,
    public authState: AuthService,
    private cookieService: CookieService
  ) {
    this.items$ = this.fbs.getCollection('items');
  }

  add() {
    this.fbs.add('items', {desc: 'DESC1', date: new Date()})
  }

  remove(item: any) {
    this.fbs.remove('items', item.id);
  };

  update(item: any) {
    this.fbs.update('items', item, {date: new Date()});
  };
}
