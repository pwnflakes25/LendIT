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
   let login = this.authService.logInUser(form.value.email, form.value.password).then(res => {
     if (res[0]) {
       this.openSnackBar("Logged In Successfully", "dismiss");
       this.successEvent.emit();
     } else {
         this.openSnackBar(res[1], "dismiss");
         return;
     }
   })
  }

  openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000
  });
}




}
