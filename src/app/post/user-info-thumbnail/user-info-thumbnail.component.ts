import { Component, OnInit, Input } from '@angular/core';
import {UserService} from "../../shared/user.service";
import {Subscription, Observable} from "rxjs";
import {concatMap, take} from "rxjs/operators";
import {UserModel} from "../../shared/user.model";



@Component({
  selector: 'app-user-info-thumbnail',
  templateUrl: './user-info-thumbnail.component.html',
  styleUrls: ['./user-info-thumbnail.component.css']
})
export class UserInfoThumbnailComponent implements OnInit {
@Input() userID;
userSub: Subscription;
userData$: Observable<{}[]>;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.fetchData()
    console.log(this.userData$)
  }


  fetchData() {
    this.userData$ = this.userService.getUserDataById(this.userID);
  }

}
