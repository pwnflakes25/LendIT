import { Component, OnInit, OnDestroy } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {formatDate} from '@angular/common';
import {PostModel} from "../post.model";
import {PostService} from "../post.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from 'rxjs';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import * as tt from "../../../assets/sdk/dist/maps.min.js";

@Component({
  selector: 'app-post-maker',
  templateUrl: './post-maker.component.html',
  styleUrls: ['./post-maker.component.css']
})
export class PostMakerComponent implements OnInit, OnDestroy {
  imageActive = false;
  imageDisplay: any = "https://cdn4.iconfinder.com/data/icons/social-communication/142/add_photo-512.png";
  imageSelected = null;
  newPostForm: FormGroup;
  newPost: PostModel;
  userID;
  isEdit = false;
  postEdit: PostModel;
  fetchingPostRefSub: Subscription;
  categories: Array<String> = [ "Electronics", "Clothing", "Sport Equipments", "Gadgets", "Vehicles", "Office Items", "Work Tools", "School Supplies" ]
  selectedTags = [];
  tagsError: boolean = true;
  mapOpen: boolean = false;
  lngLatSelected: any = null;
  lng;
  lat;


  constructor(
      private http: HttpClient,
      private postService: PostService,
      private router: Router,
      private authService: AuthService,
      private route: ActivatedRoute,
      private _fb: FormBuilder,
      private userService: UserService
    ) { }

  ngOnInit() {
    this.newPostForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'priceDuration': new FormControl('day', Validators.required),
      'description': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null, Validators.required),
      'userID': new FormControl(null),
      'tags': this.addTagsControls(),
      'categories': new FormControl(null),
      'date': new FormControl(null),
      'location': new FormControl(null)
    });
    this.userID = this.authService.getUserID();
    this.route.params.subscribe((params) => {
      if (params['edit'] === "edit") {
        this.isEdit = true;
        this.postEdit = this.postService.getPostToEdit()
        this.imageDisplay = this.postEdit.imagePath
        this.newPostForm.patchValue({
          name: this.postEdit.name,
          price: this.postEdit.price,
          priceDuration: this.postEdit.priceDuration,
          description: this.postEdit.description,
          imagePath: this.postEdit.imagePath,
          categories: this.postEdit.categories,
          date: Date.now()
        })
      }
    })
  }

 //A
  initializeMap() {
    var lng = null;
    var lat = null;

    //get current User Position
    this.mapOpen = true;
    this.userService.getPosition().then(pos=>
    {
       console.log(`Your current Positon: ${pos.lng} ${pos.lat}`);
       lng = pos.lng;
       lat = pos.lat;
       tt.setProductInfo('LendIT', '5.34.4');

         //Setting Map For Location
         let map = tt.map({
                key: 'eMfXkmOFpCIe6stGFJeB6gAjsVmnY9fJ',
                container: 'map',
                style: 'tomtom://vector/1/basic-main',
                center: [lng, lat],
                zoom: 15
            });

            //Setting map marker
             map.setLanguage('en');
              var marker =  new tt.Marker()
            .setLngLat([lng, lat])
            .addTo(map);

      this.lngLatSelected = {
            lng: lng,
            lat: lat
          }


        //registering map.onClick event for moving marker
         map.on('click', (event) => {
           console.log(event.lngLat);
           marker.setLngLat(event.lngLat).addTo(map);
           this.lngLatSelected = {
             lng: event.lngLat.lng,
             lat: event.lngLat.lat
           }
           console.log(this.lngLatSelected);
         })
    })
    .catch(err => {
      this.lngLatSelected = null;
    })
  }

 addTagsControls() {
   const arr = this.categories.map(element => {
     return this._fb.control(false);
   })
   return this._fb.array(arr);
 }

 get tagsArray() {
   return <FormArray>this.newPostForm.get('tags');
 }

 getCategoriesArray() {
   return <FormArray>this.newPostForm.get('categories');
 }

 checkTagsTouched() {
   let flg = false;
   this.tagsArray.controls.forEach(control => {
     if(control.touched) {
       flg = true;
     }
   })
   return flg;
 }

 getSelectedTags() {
   this.selectedTags = [];
   this.tagsArray.controls.forEach((control, i) => {
     if (control.value) {
       this.selectedTags.push(this.categories[i])
     }
   })
  this.tagsError = this.selectedTags.length > 0 ? false : true;
 }



 onSubmit() {
   this.newPostForm.patchValue({userID: this.userID});
   this.newPostForm.patchValue({categories: this.selectedTags});
   this.newPostForm.patchValue({date: Date.now()});
   this.newPostForm.patchValue({location: this.lngLatSelected});
   this.newPostForm.get('categories').updateValueAndValidity();
   this.newPostForm.get('userID').updateValueAndValidity();
   this.newPostForm.get('date').updateValueAndValidity();
   console.log(this.newPostForm.value);
   if(this.isEdit === true) {
     this.postService.storePostToEdit(this.newPostForm.value); //store new Form Post values to the post service
     console.log("submitting on edit")
     //below we fetch the specific post reference that wanted to be edited from database
      this.fetchingPostRefSub = this.postService.getPostRef(this.postEdit.name, this.userID).subscribe(ref => {
        console.log(ref);
        const refID = ref[0].payload.doc.id //this retrieve the reference
        this.postService.updatePost(refID);
        this.router.navigate(["/profile"])
      })
   }
   else {
     console.log("submitting on new")
     console.log(this.newPostForm);
     this.newPost = this.newPostForm.value;
     this.postService.addPost(this.newPost);
     this.router.navigate(["../"]);
   }
 }


  onHover(event) {
    this.imageActive = true;
    console.log("image is active")
  }

  onFileSelected(event: Event) {
    //this shit below helps display image uploaded
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result;
      this.newPostForm.patchValue({imagePath: this.imageDisplay});
      this.newPostForm.get('imagePath').updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }


 ngOnDestroy() {
   if(this.fetchingPostRefSub) {
     this.fetchingPostRefSub.unsubscribe();
   }
 }



}
