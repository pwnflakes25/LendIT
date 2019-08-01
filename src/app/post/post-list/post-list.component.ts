import { Component, OnInit, Input } from '@angular/core';
import {PostModel} from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
@Input() postToDisplay : PostModel[];

  constructor() { }

  ngOnInit() {

  }

}
