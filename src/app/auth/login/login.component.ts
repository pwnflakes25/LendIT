import { Component, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router"
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
@Output() openEvent = new EventEmitter();
@Output() successEvent = new EventEmitter();

  constructor(private router: Router, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSignupEvent() {
    this.openEvent.emit()
  }

  onSubmit(form: NgForm) {
   let login = this.authService.logInUser(form.value.email, form.value.password)
   console.log(login);
    if (login) {
      this.openSnackBar("Login Successful", "dismiss");
      this.successEvent.emit();
    } else {
        this.openSnackBar("Oops, something went wrong, try again!", "dismiss")
    }
  }

  openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000
  });
}




}
