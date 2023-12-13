import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {FirebaseService} from "./firebase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items$: Observable<any[]>;

  constructor(private fbs: FirebaseService) {
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
