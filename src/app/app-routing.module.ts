import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostComponent} from './post/post.component';
import {ItemComponent} from './item/item.component';
import {PostMakerComponent} from "./post/post-maker/post-maker.component";
import {SignupComponent} from "./auth/signup/signup.component";

const routes: Routes = [
{
path: "",
component:PostComponent
},
{
  path: 'listing',
  component: PostComponent
},
{
  path: 'item/:id',
  component: ItemComponent
},
{
  path: 'postEditor',
  component: PostMakerComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
