import { Component, inject } from '@angular/core';
import {Firestore, collection, collectionData, addDoc, doc, deleteDoc, getDoc, setDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  collection: any
  items$: Observable<any[]>;

  constructor(private afs: Firestore) {
    this.collection = collection(this.firestore, 'items')
    this.items$ = collectionData(this.collection, { idField: 'id'});
  }

  add() {
    addDoc(this.collection, <any> { desc: 'DESC1', date: new Date() }).then((documentReference: any) => {
      // the documentReference provides access to the newly created document
      console.log('documentReference', documentReference)
    });
  }

  remove(item: any) {
    const docItem = doc(this.firestore, `items/${item.id}`);
    deleteDoc(docItem)
  };

  update(item: any) {
    const docItem = doc(this.firestore, `items/${item.id}`);
    setDoc(docItem, {date: new Date()})
  };
}
