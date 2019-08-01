import { Component, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router"
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
@Output() openEvent = new EventEmitter();
@Output() successEvent = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSignupEvent() {
    this.openEvent.emit()
  }

  onSubmit(form: NgForm) {
    this.authService.logInUser(form.value.email, form.value.password);
    this.successEvent.emit();
  }




}
