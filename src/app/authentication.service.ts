import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GetCookiesService } from './get-cookies.service';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Cart {
  id: number;
  total: string;
  products: Product[];
}

export interface Product {
  product_id: number;
  price: number;
  name:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user_object = { name: 'pleasework', age: '28' }
  public user = new BehaviorSubject<any>(this.user_object)

  public tempcart: Cart = {
    "id": 26,
    "total": "5.55",
    "products": [
      {
        "product_id": 1,
        "price": 0.0,
        "name":"also a good name"
      },
      {
        "product_id": 2,
        "price": 99.59,
        "name":"some other name"
      },
      {
        "product_id": 3,
        "price": 0.0,
        "name":"somename"
      }
    ]
  }
  public cart = new BehaviorSubject<Cart>(this.tempcart)

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
    this.http.get("https://evening-taiga-61292.herokuapp.com/api/get_user").subscribe((data: any) => {
      if (data.name) {
        this.user.next(data)
      }
      else {
        this.user.next('')
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
      .subscribe(() => this.get_user())
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

}
