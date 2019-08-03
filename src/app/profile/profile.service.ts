import { Injectable } from '@angular/core';
import {PostModel} from "../post/post.model";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../shared/user.service";
import {PostService} from "../post/post.service";
import {Observable, BehaviorSubject, of} from "rxjs";
import {switchMap, map, concatMap} from "rxjs/operators";
import {AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {UserModel} from "../shared/user.model";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userID;
  post$: Observable<{}[]>;
  getUserPost$: BehaviorSubject<string>;
  userProfile = {
    name: "",
    userName: "",
    contact: "",
    email: "",
    address: "",
    imagePath:""
  }
  userData;
  profileToEdit;

  constructor(private authService: AuthService, private postService: PostService, private afs: AngularFirestore, private userService: UserService) {
     this.getUserPost$ = new BehaviorSubject(null); // filter for querying
     this.authService.getCurrentUserDetail().subscribe(user => {
       if(user) {
         this.userID = user.uid
         this.userData = user
         this.post$ = this.getUserPost$
         .pipe(
           switchMap(
              id => this.afs.collection(
                 'postList', ref => ref.where('userID', '==', id)
               )
           .valueChanges(),
           ),
           );

           this.getPosts();
       } else {
         console.log("No User ID Found");
       }
    })
   }


   getPosts() {
     this.getUserPost$.next(this.userID)
   }

   getUserPosts() {
    return this.post$
   }

   //fetching user Profile using specific ID
   getUserProfileById(id) {
     const ePromise = val => new Promise(resolve => resolve(val));
     const check = this.userService.getUserDataById(id).pipe(concatMap(val => ePromise(val)));
     check.subscribe(result => {
       if(result) {
         this.userProfile.name = result[0].name;
         this.userProfile.userName = result[0].userName;
         this.userProfile.contact = result[0].contact;
         this.userProfile.email = result[0].email;
        this.userProfile.address = result[0].address;
        this.userProfile.imagePath = result[0].imagePath;
       }
       else {
         this.userProfile.email = this.userData.email;
         this.userProfile.name = this.userData.name;
       }
     })
     return this.userProfile
   }


   //fetching the current user prfile
   getCurrentUserProfile() {
     return this.userService.getUserDataById(this.userID)
   }

   getCurrentUserData() {
     return this.userData;
   }

   storeProfileToEdit(profile: UserModel) {
     this.profileToEdit = profile;
   }

   getProfileToEdit() {
     return this.profileToEdit;
   }


}
