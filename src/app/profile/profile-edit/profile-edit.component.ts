import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {UserModel} from "../../shared/user.model";
import {AuthService} from "../../auth/auth.service";
import {concatMap, map} from "rxjs/operators";
import {Observable, BehaviorSubject, of, Subscription} from "rxjs";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
profileForm: FormGroup;
userData: any;
userProfile: {};
userRef;
userSub: Subscription;
defaultDisplayPic = "https://theimag.org/wp-content/uploads/2015/01/user-icon-png-person-user-profile-icon-20.png";

  constructor(private userService: UserService, private authService: AuthService, private ps: ProfileService) {}
  @Output() cancelAction = new EventEmitter();

  ngOnInit() {
    this.userSub = this.authService.getCurrentUserDetail().subscribe(user => {
      this.userData = user;

     //Setting up the forms
     this.profileForm = new FormGroup({
       'name': new FormControl( null, Validators.required),
       'userName': new FormControl( null, Validators.required),
       'contact': new FormControl(null, Validators.required),
       'address': new FormControl(null, Validators.required),
       'imagePath': new FormControl( null, Validators.required),
       'userID': new FormControl(null),
       "email": new FormControl(null),
     });


     //Retrieve the data itself
     this.userProfile = this.ps.getProfileToEdit();
     console.log(this.userProfile)

     // if (this.userProfile) {
     //   this.profileForm.patchValue({
     //           name: this.userProfile.name || "",
     //           userName: this.userProfile.userName || "",
     //           contact: this.userProfile.contact || "",
     //           address: this.userProfile.address || ""
     //   })
     // }

      //Retrieve user Reference for the document of their profile
      const check = this.userService.getUserRefById(user.uid).pipe(map(res => {
        if (res) {
          return;
        } else {
          return false;
        }
      }
      ))
      check.subscribe(result => {
        this.userRef = result[0].payload.doc.id
      })

      this.profileForm.patchValue({userID: this.userData.uid});
      this.profileForm.patchValue({email: this.userData.email});
      this.profileForm.get('email').updateValueAndValidity();
      this.profileForm.get('userID').updateValueAndValidity();
    })
  }

  onSubmit() {
    if(!this.userRef) {
      this.userService.addUser(this.profileForm.value)
    } else {
      this.userService.updateUserData(this.userRef, this.profileForm.value)
    }
    this.cancelAction.emit();
  }

  onCancel() {
    this.cancelAction.emit();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    }

}
