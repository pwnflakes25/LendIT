import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from '../environments/firebase.config';
import * as firebase from 'firebase/app';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import {PostService} from "./post/post.service";
import { PostListComponent } from './post/post-list/post-list.component';
import { ItemComponent } from './item/item.component';
import { PostMakerComponent } from './post/post-maker/post-maker.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {AuthService} from "./auth/auth.service";
import {DataStorageService} from "./shared/data-storage.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostComponent,
    PostListComponent,
    ItemComponent,
    PostMakerComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [PostService, AuthService, DataStorageService],
  bootstrap: [AppComponent],
  entryComponents: [SignupComponent, LoginComponent]
})
export class AppModule { }
