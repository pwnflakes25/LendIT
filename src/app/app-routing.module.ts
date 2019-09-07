import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostComponent} from './post/post.component';
import {ItemComponent} from './item/item.component';
import {PostMakerComponent} from "./post/post-maker/post-maker.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {FilteredPostsComponent} from "./post/filtered-posts/filtered-posts.component"

const routes: Routes = [
{
path: "",
component: PostComponent,
},
{
  path: 'listing',
  component: PostComponent
},
{
  path: 'listing/:category',
  component: FilteredPostsComponent
},
{
  path: 'item/:id',
  component: ItemComponent
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
