import { Component, OnInit} from '@angular/core';
import {slider, slideTo} from "./animation";
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider,
    slideTo
  ]
})

export class AppComponent implements OnInit {
title = 'LendIt';

    ngOnInit() {}

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
