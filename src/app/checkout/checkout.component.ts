import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Cart, User } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router: Router    ) { }
  private user:User
  public cart:Cart
  proceed(){
/*     if (! this.user.address){
      this.router.navigate(['address'])
    }
    else{
      this.router.navigate(['billing'])
    } */
    this.router.navigate(['billing'])
  }
  ngOnInit() {
    this.auth.cart.subscribe((data:Cart)=> this.cart = data)
    this.auth.user.subscribe((data:User)=> this.user = data)
  }

}
