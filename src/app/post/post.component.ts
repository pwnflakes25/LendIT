import { Component, OnInit, OnDestroy} from '@angular/core';
import {PostService} from './post.service';
import {PostModel} from './post.model';
import {AuthService} from "../auth/auth.service";
import {Observable, Subscription} from "rxjs";
import {concatMap} from "rxjs/operators";
import {UserService} from "../shared/user.service";
import {Router, Event, NavigationStart, NavigationEnd} from "@angular/router";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy{
posts: PostModel[] = [];
posts$: Observable<PostModel[]>;
postSub: Subscription;
isLoading = true;



  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.posts$ = this.postService.getPosts()
    this.postSub = this.posts$.subscribe(() => {
      this.isLoading = false;
    })
  }


  ngOnDestroy() {
   if (this.postSub) {
     this.postSub.unsubscribe();
   }
  }



}
