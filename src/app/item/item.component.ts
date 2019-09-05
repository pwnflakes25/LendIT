import { Component, OnInit, OnDestroy} from '@angular/core';
import {PostModel} from "../post/post.model";
import {PostService} from "../post/post.service";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../shared/user.service";
import {Observable, Subscription, of} from "rxjs";
import { map, concatMap} from "rxjs/operators";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import * as tt from "../../assets/sdk/dist/maps.min.js";


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy{
selectedPost : any ;
map: any;
postSub: Subscription;
settingUser: Subscription;
itemLocation;
locationAvailable: boolean = false;
displayDate: any;
defaultDisplayPic: any = "https://theimag.org/wp-content/uploads/2015/01/user-icon-png-person-user-profile-icon-20.png";
id: number;
user = {
  name: null,
  userName: null,
  contact: null,
  email: null,
  address: null
}
faTags = faTags;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient
  ) {
        library.add(faTags);
  }

  ngOnInit() {

  this.route.params
  .subscribe((params) => {
   this.id = params['id'];


     this.postSub = this.postService.getPostByID(this.id).subscribe(res => {
     this.selectedPost = res;
     if (res.location) {
       this.itemLocation = res.location;
       this.locationAvailable = true;
     }
     console.log(this.locationAvailable);

     //getting date
     let dateRaw = new Date(res.date);
     this.displayDate = dateRaw.toDateString();


     const ePromise = val => new Promise(resolve => resolve(val));
     const check = this.userService.getUserDataById(this.selectedPost.userID).pipe(concatMap(val => ePromise(val)));
     this.settingUser = check.subscribe((user:any) => {
       this.user.name = user[0].name;
       this.user.userName = user[0].userName;
       this.user.contact = user[0].contact;
       this.user.email = user[0].email;
       this.user.address = user[0].address;
       if(user[0].imagePath) {
         this.defaultDisplayPic = user[0].imagePath;
       }
     })
   })
 })
}



initializeMap() {
       //Setting Map For Location
       tt.setProductInfo('LendIT', '5.34.4');
       var map = tt.map({
              key: 'eMfXkmOFpCIe6stGFJeB6gAjsVmnY9fJ',
              container: 'map',
              style: 'tomtom://vector/1/basic-main',
              center: [this.itemLocation.lng, this.itemLocation.lat],
              zoom: 15
          });

        //Setting map marker
         map.setLanguage('en');
          var marker =  new tt.Marker()
        .setLngLat([this.itemLocation.lng, this.itemLocation.lat])
        .addTo(map);

}

clickMap(event) {
 console.log(event);
}



ngOnDestroy() {
  if(this.postSub) {
    this.postSub.unsubscribe();
  }
  if(this.settingUser) {
    this.settingUser.unsubscribe();
  }
}


}
