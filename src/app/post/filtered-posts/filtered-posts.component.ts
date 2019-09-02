import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {PostService} from "../post.service";
import {Router, ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-filtered-posts',
  templateUrl: './filtered-posts.component.html',
  styleUrls: ['./filtered-posts.component.css']
})
export class FilteredPostsComponent implements OnInit {
category;
categorizedPosts$: Observable<{}[]>;
isLoading = true;
categorySub: Subscription;
posts: {}[];

  constructor(private postService: PostService, private aRoute: ActivatedRoute) {}

  ngOnInit() {
    this.aRoute.params
    .subscribe((params) => {
     this.category = params['category'];
     this.categorySub = this.postService.getQueriedList().subscribe(res => {
       this.posts = [...res];
       this.isLoading = false;
     })
     this.postService.applyCategoryFilter(this.category);
   })
  }



}
