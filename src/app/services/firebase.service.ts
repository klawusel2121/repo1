import {inject, Injectable, Type} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  query,
  setDoc,
  where
} from "@angular/fire/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "./auth.service";
import {TenantInterface} from "../models/tenant-interface";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);

  userCredential: any;
  userCredential$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private cookieService: CookieService, private authService: AuthService) {
  }

  getCollection(collectionName: string): Observable<Array<any>> {
    return collectionData(query(collection(this.firestore, collectionName), where('tenantId', '==', this.authService.TenantId)),{idField: 'id'});
  }

  add(collectionName: string, data: any) {
    data.tenantId = this.authService.TenantId;
    addDoc(collection(this.firestore, collectionName), <any>data).then((documentReference: any) => {
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

  singUpUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log('signed up', userCredential);
        this.cookieService.set('email', email);
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log('error', error);
        const errorCode = error.code;
        const errorMessage  = error.message;
        // ..
      });
  }

  singInUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.cookieService.set('email', email);
        this.userCredential = userCredential;
        this.userCredential$.next(true);
        setTimeout(() => {
          this.userCredential$.next(false);
        }, 4000)
        console.log('signed in', userCredential);
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log('error', error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

}
