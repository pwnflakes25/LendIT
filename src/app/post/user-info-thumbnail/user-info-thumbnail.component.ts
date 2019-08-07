import { Component, OnInit, Input } from '@angular/core';
import {UserService} from "../../shared/user.service";
import {Subscription} from "rxjs";
import {concatMap} from "rxjs/operators";

@Component({
  selector: 'app-user-info-thumbnail',
  templateUrl: './user-info-thumbnail.component.html',
  styleUrls: ['./user-info-thumbnail.component.css']
})
export class UserInfoThumbnailComponent implements OnInit {
@Input() userID;
displayPic: any = "https://cdn4.iconfinder.com/data/icons/social-communication/142/add_photo-512.png";
displayName: any;
userName: any = "Random Name";
userSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.userService.getUserDataById(this.userID).subscribe(user => {
    //   console.log(this.userName);
    //   this.userName = user.userName;
    //   if (user.imagePath) {
    //     this.displayPic = user.imagePath;
    //   }
    // })
  }

}
