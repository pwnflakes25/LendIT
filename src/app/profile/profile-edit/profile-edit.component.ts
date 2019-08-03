import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {concatMap, map} from "rxjs/operators";
import {Observable, BehaviorSubject, of, Subscription} from "rxjs";

import {UserService} from "../../shared/user.service";
import {UserModel} from "../../shared/user.model";
import {AuthService} from "../../auth/auth.service";

import {ProfileService} from "../profile.service";


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
profileForm: FormGroup;
userData: any;
userProfile: any;
userRef = null;
userSub: Subscription;
defaultDisplayPic: any = "https://theimag.org/wp-content/uploads/2015/01/user-icon-png-person-user-profile-icon-20.png";

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private ps: ProfileService,
    private router: Router
  ) {}
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
      this.retrieveProfile();

      //Retrieve user Reference for the document of their profile
      const check = this.userService.getUserRefById(user.uid).pipe(map(res => {
        if (res) {
          return res;
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
    if(this.userRef) {
      this.userService.updateUserData(this.userRef, this.profileForm.value)
    } else {
      this.userService.addUser(this.profileForm.value)
    }
    this.cancelAction.emit();
  }

  async retrieveProfile() {
    this.userProfile = await this.ps.getProfileToEdit();
    if(this.userProfile.imagePath) {
      this.defaultDisplayPic = this.userProfile.imagePath;
    }
    console.log(this.userProfile)

    if (this.userProfile) {
      this.profileForm.patchValue({
              name: this.userProfile.name || "",
              userName: this.userProfile.userName || "",
              contact: this.userProfile.contact || "",
              address: this.userProfile.address || "",
              imagePath: this.userProfile.imagePath || ""
      })
    }
  }

  onFileSelected(event: Event) {
    //this shit below changes files to url
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.defaultDisplayPic = reader.result;
      this.profileForm.patchValue({imagePath: reader.result});
      this.profileForm.get('imagePath').updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }


  onCancel() {
    this.cancelAction.emit();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    }

}
