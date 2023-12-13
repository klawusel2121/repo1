import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  constructor() { }

  getCollection(collectionName: string): Observable<Array<any>> {
    return collectionData(collection(this.firestore, collectionName), { idField: 'id'});
  }

  add<T>(collectionName: string, data: T) {
    addDoc(collection(this.firestore, collectionName), <any> data).then((documentReference: any) => {
      console.log('addDoc', documentReference);
    });
  }

  remove(collectionName: string, id: string) {
    const docItem = doc(this.firestore, `${collectionName}/${id}`);
    deleteDoc(docItem).then((documentReference: any) => {
      console.log('deleteDoc', documentReference);
    });
  };

  update(collectionName: string, item: any, patchValue: any) {
    const docItem = doc(this.firestore, `${collectionName}/${item.id}`);
    setDoc(docItem, {...item, ...patchValue}).then((documentReference: any) => {
      console.log('setDoc', documentReference);
    });
  };
}
