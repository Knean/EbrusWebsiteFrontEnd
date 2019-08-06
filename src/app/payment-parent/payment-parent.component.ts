import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetImagesService } from '../get-images.service';
import { Router } from '@angular/router';
import { AuthenticationService, User, Address, Cart, Order } from '../authentication.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-payment-parent',
  templateUrl: './payment-parent.component.html',
  styleUrls: ['./payment-parent.component.css']
})
export class PaymentParentComponent implements OnInit, OnDestroy {

  constructor(
    public httpClient: GetImagesService,
    public router: Router,
    public auth: AuthenticationService,
  ) { }

  public cartSubscription: Subscription
  public cart: Cart
  public user: User
  public userSubscription: Subscription
  public address: Address///search for address on init
  public order: Order
  public getAddress(address: Address) { this.address = address }
  postToken(token: string) {
    this.auth.createOrder(token, this.address, this.cart)
      .subscribe((data: any) => {
        console.log(data, 'order created ^^');
        if (!data.errors) {
          this.order = data
          this.auth.clearCart()
          //reset cart
          //this.auth.cart.next()
        }
      })
/*     console.log('no errors')
    this.httpClient.sendToken(token).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        console.log(data)
        this.router.navigate(['order'])
      }
    })


    console.log(token, 'result!')

   */}
  ngOnInit() {
    //this.auth.createOrder("lsdjldsjf",this.address,this.cart).subscribe(data=>console.log(data, 'order created'))
    this.cartSubscription = this.auth.cart.subscribe(data => this.cart = data)
    this.cartSubscription.unsubscribe()
    this.userSubscription = this.auth.user.subscribe((data: User) => {
      this.user = data
    })
    this.auth.getAddress().subscribe((data:any)=>this.address = data)
    //se

  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }
}
