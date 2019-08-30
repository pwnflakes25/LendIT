import { Component, OnInit} from '@angular/core';
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
export class PostComponent implements OnInit{
posts: PostModel[] = [];
posts$: Observable<PostModel[]>;
categorizedPosts$: Observable<{}[]>;
isLoading = true;
isCategorized = false;


  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart) {
        this.isLoading = true;
      }

      if(event instanceof NavigationEnd) {
        this.isLoading = false;
      }
    })
  }

  ngOnInit() {
    this.posts$ = this.postService.getPosts()
  }

  categorizeList(category) {
    console.log("Emission Detected")
    this.isCategorized = true;
    this.categorizedPosts$ = this.postService.applyCategoryFilter(category)
    // this.categorizedPosts$.subscribe(res => {
    //   console.log(res);
    // })
  }

  removeFilter() {
    this.isCategorized = false;
    this.posts$ = this.postService.getPosts()
  }

}
