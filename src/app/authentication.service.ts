import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GetCookiesService } from './get-cookies.service';
import { BehaviorSubject, Subject, observable } from 'rxjs';

export interface Cart {
  id: number;
  total: string;
  products: Product[];
}

export interface Product {
  product_id: number;
  price: number;
  name: string;
}
export interface Address {
  address_line_1: string;
  address_line_2?: string;
  id?: string
}

export interface Order {
  total: number;
  address: Address[];
  products: Product[];
}
export interface User {
  username: string;
  email?: string;
  address?: Address;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public tempcart: Cart = {
    "id": 26,
    "total": "5.55",
    "products": [
      {
        "product_id": 1,
        "price": 0.0,
        "name": "also a good name"
      },
      {
        "product_id": 2,
        "price": 99.59,
        "name": "some other name"
      },
      {
        "product_id": 3,
        "price": 0.0,
        "name": "somename"
      }
    ]
  }

  user_object_noaddress = { username: 'pleasework', age: '28', address: null }
  user_object = { username: 'pleasework', age: '28', address: { address_line_1: 'lskdjfsldkjf' } }
  public user = new BehaviorSubject<User>(this.user_object_noaddress)
  public cart = new BehaviorSubject<Cart>(this.tempcart)
  public order: Order
  public anonymousAddress: Address

  //public user = {name: 'mariouser',age:'29'}
  constructor(private http: HttpClient, private cookie: GetCookiesService) { }

  register(username, password) {
    this.http.post("https://evening-taiga-61292.herokuapp.com/api/register", { "username": username, "password": password })
      .subscribe(() => {
        this.login(username, password);
        this.get_user()
      })

  }
  get_user() {
         this.http.get("https://evening-taiga-61292.herokuapp.com/api/get_user").subscribe((data: User) => {
          if (data.username) {
            this.user.next(data)
          }
          else {
            this.user.next(null)
          }
    
        }) 
  }
  login(username, password) {
    let csrf = this.cookie.getCookie('csrftoken')
    let csrfheader = new HttpHeaders({ 'X-CSRFToken': csrf })
    this.http.post("https://evening-taiga-61292.herokuapp.com/api/login", { "username": username, "password": password }, { headers: csrfheader }).
      subscribe(() => this.get_user())
  }
  logout() {

    this.http.get("https://evening-taiga-61292.herokuapp.com/api/logout")
      .subscribe(() => {this.get_user(); this.refreshCart()})
  }
  //add product to the cart in session
  updateCart(productid) {
    let formdata = new HttpParams().set('product_id', productid)
    this.http.post("https://evening-taiga-61292.herokuapp.com/cart/", formdata)

      .subscribe((data) => {
        console.log(data);
        this.refreshCart()
      })
  }

  // get or create a shopping cart
  refreshCart() {
        this.http.get("https://evening-taiga-61292.herokuapp.com/getCart/")
         .subscribe((data: Cart) => this.cart.next(data))
    
  }

  createAddress(address_line_1, address_line_2) {
    let csrf = this.cookie.getCookie('csrftoken')
    let csrfheader = new HttpHeaders({ 'X-CSRFToken': csrf})
    
    let formdata = new HttpParams().set('address_line_1', address_line_1).set('address_line_2', address_line_2)
    
    return this.http.post( "https://evening-taiga-61292.herokuapp.com/createAddress/",formdata, {headers: csrfheader} )
  }
  getAddress() {
    return this.http.get("https://evening-taiga-61292.herokuapp.com/getAddress/")
  }

  createOrder(token: string, address: Address, cart: Cart) {
    let csrf = this.cookie.getCookie('csrftoken')
    let csrfheader = new HttpHeaders({ 'X-CSRFToken': csrf})
    let user: User
    let userSubscription = this.user.subscribe((userdata: User) => user = userdata)

    let formdata = new HttpParams()
    cart.products.forEach((value) => {
      let product_id = value.product_id.toString()
      formdata =formdata.append('products', product_id)
    } )
    formdata = formdata.set('address',address.id.toString())
    formdata = formdata.set('total',cart.total.toString())
    formdata = formdata.set('stripe_token',token)

    /*     .append('products', '1').append('products', '2')
        .set('user', '1')
        .set('address', '21')
        .set('total', '9.99')
        .set('stripe_token', token) */
    userSubscription.unsubscribe()
    return this.http.post("https://evening-taiga-61292.herokuapp.com/create_order", formdata, {headers: csrfheader})
  }

  clearCart() {
    return this.http.get("https://evening-taiga-61292.herokuapp.com/clear_cart").subscribe(()=>this.refreshCart())
  }
}
