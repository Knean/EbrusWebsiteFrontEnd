import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Cart } from '../authentication.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }
  public cart:Cart
  ngOnInit() {
    this.auth.cart.subscribe((data:Cart)=> this.cart = data)
  }

}
