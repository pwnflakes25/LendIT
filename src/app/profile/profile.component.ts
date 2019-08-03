import { Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {PostService} from "../post/post.service";
import {PostModel} from "../post/post.model";
import {ProfileService} from "./profile.service";
import {UserModel} from "../shared/user.model";
import {Observable, Subscription, of} from "rxjs";
import {concatMap} from "rxjs/operators";
import {Router} from "@angular/router"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
edit = false;
userData;
userSub: Subscription;
userPostSub: Subscription;
deleteSub: Subscription;
defaultDisplayPic = "https://theimag.org/wp-content/uploads/2015/01/user-icon-png-person-user-profile-icon-20.png";

user: UserModel = {
  userName: null,
  name: null,
  contact: null,
  email: null,
  address: null,
  imagePath: null,
  userID: null
}
userPosts = [];


  constructor(
    private ps: ProfileService,
    private authService: AuthService,
    private router: Router,
    private postService: PostService
  )
  {
    library.add(faCog);
  }


  ngOnInit() {
    this.ps.getPosts()
    this.userPostSub = this.ps.getUserPosts().subscribe(result => {
      this.userPosts = [...result];
    })
    this.refreshData();
  }


  //initialize profile page
  refreshData() {
   this.user.email = this.ps.getCurrentUserData().email;
   const ePromise = val => new Promise(resolve => resolve(val));
   const check = this.ps.getCurrentUserProfile().pipe(concatMap(val => ePromise(val)));
   this.userSub = check.subscribe(result => {
     if(result[0].name) {
       this.user.userName = result[0].userName;
       this.user.name = result[0].name;
       this.user.contact = result[0].contact;
       this.user.email = result[0].email;
       this.user.address = result[0].address;
       this.user.imagePath = result[0].imagePath;
       this.defaultDisplayPic = this.user.imagePath;
     }
   })
   }


  returnPost() {
    this.ps.getUserPosts().subscribe(result => {
      this.userPosts = [...result];
    })
  }

  onEdit() {
    this.edit = true;
    this.ps.storeProfileToEdit(this.user)
  }

  onCancel() {
    this.edit = false;
  }

  onEditPost(index) {
    this.postService.storePostToEdit(this.userPosts[index])
    this.router.navigate(["/post/edit"])
  }

  onDeletePost(index) {
   this.deleteSub = this.postService.getPostRef(this.userPosts[index].name, this.userPosts[index].userID).subscribe(ref => {
     let postRef = ref[0].payload.doc.id;
     if (postRef) {
        this.postService.deletePost(postRef);
     }
     else {
       console.log("No Post Found");
     }
   })
  }

 // refreshData() {
 //  this.user = this.ps.getCurrentUserProfile();
 //  }



  ngOnDestroy() {
    if(this.userPostSub) {
      this.userPostSub.unsubscribe();
    }
    if(this.userSub) {
      this.userSub.unsubscribe();
    }
    if(this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }




}
