import { Component, OnInit, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {LoginComponent} from "../auth/login/login.component";
import {SignupComponent} from "../auth/signup/signup.component";
import {AuthService} from "../auth/auth.service";
import {Subject} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent implements OnInit {
isAuthenticated;
faUserCircle = faUserCircle;
faPlusCircle = faPlusCircle;

  constructor(private dialog: MatDialog, private authService: AuthService, private _snackBar: MatSnackBar) {
     library.add(faUserCircle);
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
    const dialogRef = this.dialog.open(SignupComponent);
    const sub1 = dialogRef.componentInstance.successEvent.subscribe(() => {
      dialogRef.close();
    })
    dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
   });
  }

  onLogout() {
    console.log("logging out")
    this.authService.onSignOut();
    this.openSnackBar("Logged Out Successfully", "Dismiss");
  }

  openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}

}
