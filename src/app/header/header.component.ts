import { Component, OnInit, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {LoginComponent} from "../auth/login/login.component";
import {SignupComponent} from "../auth/signup/signup.component";
import {AuthService} from "../auth/auth.service";
import {Subject} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent implements OnInit {
isAuthenticated;

  constructor(private dialog: MatDialog, private authService: AuthService) {
     this.isAuthenticated = this.authService.isAuth();
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuth();
  }

  checkAuth() {
   this.isAuthenticated = this.authService.isAuth()
   return this.isAuthenticated;
 }


  onLogin() {
    console.log("Logging In")
    const dialogRef = this.dialog.open(LoginComponent)
    //this part below listens to the event emmited by onLogin();
    const sub = dialogRef.componentInstance.openEvent.subscribe(() => {
      console.log('success');
      dialogRef.close();
      this.onSignup();
    })

    const sub2 = dialogRef.componentInstance.successEvent.subscribe(() => {
      dialogRef.close();
    })

    dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
     sub.unsubscribe();
   });
  }

  onSignup() {
    console.log("SignUp")
    const dialogRef = this.dialog.open(SignupComponent)
    dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
   });
  }

  onLogout() {
    console.log("logging out")
    this.authService.onSignOut();
  }
}
