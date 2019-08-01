import { Injectable, OnInit } from '@angular/core';
import {initializeApp, database} from "firebase";
import * as firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "../../environments/firebase.config";
import {Subscription, Observable} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isAuthState;
userID;
userSub: Observable<any>;


  constructor(private router: Router, private afAuth: AngularFireAuth) {

      this.userSub = this.afAuth.authState
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
   createUser(email: string, password: string) {
     firebase.auth().createUserWithEmailAndPassword(email, password)
     .then(cred => {
       console.log(cred)
       this.router.navigate(["/"])
     })
     .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
  });
   }


 //logging user in
   logInUser(email: string, password: string) {
         firebase.auth().signInWithEmailAndPassword(email, password)
         .then(cred => {
           console.log(cred)
           this.router.navigate(["/"])
         })
         .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
      });
   }

   onSignOut() {
     firebase.auth().signOut()
     this.router.navigate(["/"])
   }



}
