import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService, Order } from '../authentication.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Input() orderObject: Order

  constructor(private auth: AuthenticationService) { }
 
  ngOnInit() {
  /*   this.auth.createOrder().subscribe((data:Order)=> {
      this.orderObject = data;
      console.log(data)}) */
  }

}
