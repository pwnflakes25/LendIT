import { Component, OnInit, OnDestroy } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {formatDate} from '@angular/common';
import {PostModel} from "../post.model";
import {PostService} from "../post.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from 'rxjs';

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

  constructor(
      private http: HttpClient,
      private postService: PostService,
      private router: Router,
      private authService: AuthService,
      private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.newPostForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'priceDuration': new FormControl('day', Validators.required),
      'description': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null, Validators.required),
      'userID': new FormControl(null),
      'tags': new FormArray([])
    });
    this.userID = this.authService.getUserID();
    this.newPostForm.patchValue({userID: this.userID});
    this.newPostForm.patchValue({date: formatDate(new Date(), 'yyyy/MM/dd', 'en')});
    this.newPostForm.get('userID').updateValueAndValidity();
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
          date: formatDate(new Date(), 'yyyy/MM/dd', 'en')
        })
      }
    })
  }

 onSubmit() {
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
