import { Component, OnInit } from '@angular/core';
import { GetImagesService } from '../get-images.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, Cart } from '../authentication.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products
  public cart:Cart
  
  constructor(
    private getimages: GetImagesService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService) { }

  productInCart(id) {
    let products = this.cart.products.map(value => value.product_id)
    return products.indexOf(id) > -1 ? true : false

  }

  updateCart(id){
    this.auth.updateCart(id)
  }
  loadresults(query) {
    this.getimages.searchProducts(this.activeroute.snapshot.queryParams.search).subscribe((data) => {
      this.products = data
    })
  }
  loadallresults() {
    this.getimages.getProducts()
      .subscribe((data) => {
        this.products = data

      })
  }
  navigate(event: any) {
    /* console.log(event.target.dataset) */
    this.router.navigate([`detail/${event.target.dataset.index}`])

  }
  ngOnInit() {

    this.auth.cart.subscribe((data: Cart) => this.cart = data)

    this.activeroute.queryParams.subscribe(queryParams => {
      if (queryParams.search) {
        this.loadresults(queryParams.search)
        console.log('loading search results')
      }
      else {
        this.loadallresults()
        console.log('loading all results')
      }
    });

  }

}
