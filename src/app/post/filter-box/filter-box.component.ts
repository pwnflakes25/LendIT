import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {PostService} from "../post.service";

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css']
})
export class FilterBoxComponent implements OnInit {
  @Output() categorize = new EventEmitter();
  @Output() removeFilter = new EventEmitter();
categories: Array<String> = [ "Electronics", "Clothing", "Sport Equipments", "Gadgets", "Vehicles", "Office Items", "Work Tools", "School Supplies" ];

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  selectedFilter(i) {
    this.categorize.emit(this.categories[i]);
  }

  undoCat() {
   this.removeFilter.emit();
  }

}
