import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoThumbnailComponent } from './user-info-thumbnail.component';

describe('UserInfoThumbnailComponent', () => {
  let component: UserInfoThumbnailComponent;
  let fixture: ComponentFixture<UserInfoThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
