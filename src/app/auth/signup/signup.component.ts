import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    this.authService.createUser(form.value.email, form.value.password)
  }
}
