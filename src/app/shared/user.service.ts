import { Injectable } from '@angular/core';
import {UserModel} from "./user.model";
import { Router } from '@angular/router';
import {AuthService} from "../auth/auth.service";

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of , BehaviorSubject} from 'rxjs';
import { switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //collection Ref
  userCollection: AngularFirestoreCollection<UserModel>; //reference to the collection that will be queried
  usersData: Observable<{}[]>; //will contain the user retrieved after filter query


  //querying BehaviorSubject
  userFilterBehavior: BehaviorSubject<string>; //the filter to be used for the query

  //document Ref
  userDoc: AngularFirestoreDocument<UserModel>;
  user$: Observable<UserModel>;

  constructor(private afs: AngularFirestore, private authService: AuthService, private router: Router) {
    this.userFilterBehavior = new BehaviorSubject(null);
    this.userCollection = afs.collection<UserModel>('users');
    this.usersData = this.userCollection.valueChanges();

}


 getUserRefById(userID) {
  this.usersData = this.userFilterBehavior
  .pipe(
    switchMap(
       id => this.afs.collection('users', ref =>
          ref.where('userID', '==', id)
       )
    .snapshotChanges(),
    ),
    );
    this.userFilterBehavior.next(userID)
    return this.usersData;
}

 getUserDataById(userID) {
 this.usersData = this.userFilterBehavior
 .pipe(
   switchMap(
      id => this.afs.collection('users', ref =>
         ref.where('userID', '==', id)
      )
   .valueChanges(),
   ),
   );
   this.userFilterBehavior.next(userID)
   return this.usersData;
}


addUser(user: UserModel) {
  this.userCollection.add(user).then(result => {
    console.log("Adding Success")
    this.router.navigate(["/profile"])
  })
  .catch(err => console.log(err))
}

updateUserData(ref, userData: UserModel) {
    this.userDoc = this.afs.doc<UserModel>('users/' + ref);
    this.user$ = this.userDoc.valueChanges();
    this.userDoc.update(userData).then(result => {
      console.log("Updating Success")
      this.router.navigate(["/profile"])
    })
    .catch(err => console.log(err))
  }

  getPosition(): Promise<any>  {
     return new Promise((resolve, reject) => {
       navigator.geolocation.getCurrentPosition(resp => {
           resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
         },
         err => {
           reject(err);
         });
     });
   }


}
