import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTv, faTshirt, faTableTennis, faMobile, faBicycle, faBriefcase, faTools, faPencilRuler, faChevronDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Array<String> = [ "Electronics", "Clothing", "Sport Equipments", "Gadgets", "Vehicles", "Office Items", "Work Tools", "School Supplies" ];
  faTv = faTv;
  faTshirt = faTshirt;
  faTableTennis = faTableTennis;
  faMobile = faMobile;
  faBicycle = faBicycle;
  faBriefcase = faBriefcase;
  faTools = faTools;
  faPencilRuler = faPencilRuler;
  faChevronDown = faChevronDown;

  constructor() {}

  ngOnInit() {
  }

  toCategoryBox() {
    document.getElementById("jumbotron").scrollIntoView({ behavior: 'smooth' });
    console.log("Scroll")
  }


}
