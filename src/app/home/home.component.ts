import { Component, OnInit, HostListener} from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTv, faTshirt, faTableTennis, faMobile, faBicycle, faBriefcase, faTools, faPencilRuler, faChevronDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public innerWidth: any;
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
  iconSize;


  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
      if (this.innerWidth <= 768) {
        this.iconSize = "3x";
      } else {
        this.iconSize = "5x";
      }
  console.log(this.iconSize);
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 700) {
      this.iconSize = "3x";
    } else {
      this.iconSize = "5x";
    }
  }

  toCategoryBox() {
    document.getElementById("jumbotron").scrollIntoView({ behavior: 'smooth', block: 'center' });
    console.log("Scroll")
  }


}
