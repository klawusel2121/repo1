import { Component, inject } from '@angular/core';
import {Firestore, collection, collectionData, addDoc, deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {DocumentReference} from "@angular/fire/compat/firestore";
import {remove} from "@angular/fire/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  collection: any
  items$: Observable<any[]>;

  constructor() {
    this.collection = collection(this.firestore, 'items')
    this.items$ = collectionData(this.collection);
    this.items$.subscribe(items => console.log('items', items))
  }

  add() {
    addDoc(this.collection, <any> { desc: 'DESC1', date: new Date() }).then((documentReference: any) => {
      // the documentReference provides access to the newly created document
      console.log('documentReference', documentReference)
    });
  }

  remove(item: any) {
    console.log(item, this.collection, collectionData(this.collection))
    //deleteDoc(this.collection[0])
  };
}
