import { Component, OnInit } from '@angular/core';
import { DropdownDirective } from '../dropdown.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public show=false
dropdown(){
  this.show = !this.show
}
  constructor() { }

  ngOnInit() {
  }

}
