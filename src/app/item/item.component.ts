import { Component, OnInit, OnDestroy } from '@angular/core';
import {PostModel} from "../post/post.model";
import {PostService} from "../post/post.service";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../shared/user.service";
import {Observable, Subscription, of} from "rxjs";
import { map, concatMap} from "rxjs/operators";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy{
selectedPost : PostModel;
settingUser: Subscription;
defaultDisplayPic = "https://theimag.org/wp-content/uploads/2015/01/user-icon-png-person-user-profile-icon-20.png";
id: number;
user = {
  name: null,
  userName: null,
  contact: null,
  email: null,
  address: null
}

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {

  this.route.params
  .subscribe((params) => {
   this.id = +params['id'];
   this.selectedPost = this.postService.getPost(this.id);
   const ePromise = val => new Promise(resolve => resolve(val));
   const check = this.userService.getUserDataById(this.selectedPost.userID).pipe(concatMap(val => ePromise(val)));
   this.settingUser = check.subscribe(user => {
     this.user.name = user[0].name;
     this.user.userName = user[0].userName;
     this.user.contact = user[0].contact;
     this.user.email = user[0].email;
     this.user.address = user[0].address;
   })
 })

}

ngOnDestroy() {
  if(this.settingUser) {
    this.settingUser.unsubscribe();
  }
}


}
