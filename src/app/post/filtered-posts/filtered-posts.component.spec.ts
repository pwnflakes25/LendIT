import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredPostsComponent } from './filtered-posts.component';

describe('FilteredPostsComponent', () => {
  let component: FilteredPostsComponent;
  let fixture: ComponentFixture<FilteredPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
