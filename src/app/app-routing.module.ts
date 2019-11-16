import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostComponent} from './post/post.component';
import {ItemComponent} from './item/item.component';
import {PostMakerComponent} from "./post/post-maker/post-maker.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {FilteredPostsComponent} from "./post/filtered-posts/filtered-posts.component"
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
{
path: "",
component: HomeComponent,
data: {animation: 'isLeft'}
},
{
  path: 'listing',
  component: PostComponent,
  data: {animation: 'isRight'}
},
{
  path: 'listing/:category',
  component: FilteredPostsComponent,
  data: {animation: 'isMoreRight'}
},
{
  path: 'item/:id',
  component: ItemComponent,
  data: {animation: 'isMoreRight'}
},
{
  path: 'post/:edit',
  component: PostMakerComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
