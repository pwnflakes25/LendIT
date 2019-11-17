import { Injectable, OnInit } from '@angular/core';
import {initializeApp, database} from "firebase";
import * as firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "../../environments/firebase.config";
import {Subscription, Observable} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isAuthState;
userID;
userSub: Observable<any>;


  constructor(private router: Router, private afAuth: AngularFireAuth) {

      this.userSub = this.afAuth.authState;
      this.afAuth.authState.subscribe(user => {
         if(user) {
           this.isAuthState = true;
           this.userID = user.uid
         } else {
           this.isAuthState = false;
         }
       })
   }


 isAuth() {
   return this.isAuthState;
 }

getCurrentUserDetail() {
  return this.userSub;
}

 getUserID () {
   return this.userID;
 }


//signing user up
  async createUser(email: string, password: string, username: string) {
     let result;
     return result = await firebase.auth().createUserWithEmailAndPassword(email, password)
     .then(cred => {
       return true;
       this.router.navigate(["/"])
     })
     .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      return false;
  });
  }


 //logging user in
   async logInUser(email: string, password: string) {
     let result;
     return result = await firebase.auth().signInWithEmailAndPassword(email, password)
         .then(cred => {
           return [true, "Logged In Successfully"];
         })
         .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          return [false, errorMessage];
      });
   }

   async logInUserWithGoogle() {
     let result;
     return result = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(cred => {
       return [true, "Loggen In Successfully"];
     }).catch(function(error) {
       let errorCode = error.code;
       let errorMessage = error.message;
       return [false, errorMessage];
     })
   }

   onSignOut() {
     firebase.auth().signOut()
     this.router.navigate(["/"])
   }



}
