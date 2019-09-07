import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
@Output() successEvent = new EventEmitter();

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar ) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    const signup = this.authService.createUser(form.value.email, form.value.password, form.value.username)
    if(signup) {
      this.openSnackBar("Sign Up Successful!", "Dismiss");
      this.successEvent.emit();
    } else {
      this.openSnackBar("Oops! Something went wrong", "Dismiss");
    }
  }

  openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}

}
