import { Component, OnInit } from '@angular/core';
import {PostService} from './post.service';
import {PostModel} from './post.model';
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
posts: PostModel[] = [];
posts$: Observable<PostModel[]>;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    // this.posts = this.postService.getPosts();
    this.posts$ = this.postService.getPosts();
  }

}
