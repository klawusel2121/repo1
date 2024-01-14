import {inject, Injectable, NgZone} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {StateService} from "./state.service";
import {FirebaseService} from "./firebase.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  UserData : any;
  Tenants = localStorage.getItem('tenant-list')
  TenantDetails: any;

  constructor(private auth: Auth,private router : Router, public ngZone: NgZone){
    onAuthStateChanged(this.auth,(user: any)=>{
      if(user){
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  setTenant(tenant: string): void {
    console.log('setTenant', tenant)
    localStorage.setItem('tenant', tenant);
  }

  //get User
  //get Authenticated user from firebase
  getAuthFire(){
    return this.auth.currentUser;
  }

  //get Authenticated user from Local Storage
  getAuthLocal(){
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user;
  }

  //Check wither User Is looged in or not
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }

  //Register Method
  Register(email : string, password : string) {
    this.auth.tenantId = localStorage.getItem('tenant');
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          /* Call the SendVerificaitonMail() function when new user sign
       up and returns promise */
          this.sendEmailVerification()
          this.router.navigate(['/profile']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //Login Method
  Login(email : string, password : string){
    this.auth.tenantId = localStorage.getItem('tenant');;
    console.log('login', email, password, this.auth.tenantId)
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        console.log('login', result)
        this.UserData = result.user;
        let tenantList = localStorage.getItem('tenant-list') ?? '';
        if (tenantList.split(',').indexOf(this.auth.tenantId!) === -1) {
          tenantList += ',' + this.auth.tenantId!;
          localStorage.setItem('tenant-list', tenantList);
        }
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('lastLogin', new Date().toLocaleString());
        this.ngZone.run(() => {
          this.router.navigate(['/profile']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //Logout
  Logout() {
    this.auth.tenantId = null; //localStorage.getItem('tenant');
    signOut(this.auth).then(()=>this.router.navigate(['/sign-in']))
  }

  //login with Email or Facebook
  //Login with Google
  GoogleAuth() {
    return this.loginWithPopup(new GoogleAuthProvider());
  }


  //Login with Facebook
  //FacebookAuth() {
  //  return this.loginWithPopup(new FacebookAuthProvider());
  //}


  //Pop Up Provider
  loginWithPopup(provider :any) {
    this.auth.tenantId = localStorage.getItem('tenant');
    return signInWithPopup(this.auth,provider).then(() => {
      this.router.navigate(['profile']);
    });
  }

  //Send Password Reset Email
  async sendPasswordResetEmails(email : string){
    this.auth.tenantId = localStorage.getItem('tenant');
    sendPasswordResetEmail(this.auth,email)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  //Send Email Verification
  sendEmailVerification(){
    return sendEmailVerification(this.auth.currentUser as User );
  }
}
