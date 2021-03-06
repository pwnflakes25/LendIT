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
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NavbarModule, WavesModule, ButtonsModule, CarouselModule} from 'angular-bootstrap-md';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import {PostService} from "./post/post.service";
import { ItemComponent } from './item/item.component';
import { PostMakerComponent } from './post/post-maker/post-maker.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {AuthService} from "./auth/auth.service";
import {DataStorageService} from "./shared/data-storage.service";
import { ProfileComponent } from './profile/profile.component';
import {ProfileService} from "./profile/profile.service";
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import {AuthGuardService} from "./auth/auth-guard.service";
import { FilterBoxComponent } from './post/filter-box/filter-box.component';
import { FilteredPostsComponent } from './post/filtered-posts/filtered-posts.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostComponent,
    ItemComponent,
    PostMakerComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    ProfileEditComponent,
    FilterBoxComponent,
    FilteredPostsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    NgbModule,
    FontAwesomeModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    MatButtonModule,
    CarouselModule,
    MatSnackBarModule,
    MatCardModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [PostService, AuthService, DataStorageService, ProfileService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [SignupComponent, LoginComponent]
})
export class AppModule { }
