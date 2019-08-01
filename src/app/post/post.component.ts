import { Component, OnInit } from '@angular/core';
import {PostService} from './post.service';
import {PostModel} from './post.model';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
posts: PostModel[] = [];

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    // this.postService.getPosts().subscribe(values => {
    //   for(let i=0; i < values.length; i++) {
    //     this.posts.push(values[i])
    //   }
    // })
    this.posts = this.postService.getPosts();
  }

}
