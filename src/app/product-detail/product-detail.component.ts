import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetImagesService } from '../get-images.service';
import { AuthenticationService, Cart } from '../authentication.service';
import { CartUtilities } from '../shared/shared';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private service: GetImagesService,
    private auth: AuthenticationService) { }

  public product
  public displayedImage
  public cart:Cart 
  public pk = this.route.snapshot.paramMap.get('pk');
  public inCart:boolean
  imgClick(event: any){    
    let index = event.target.dataset.index
    this.displayedImage = this.product.image_set[index].url
  }
  updateCart(){
    this.auth.updateCart(this.pk)
  }
  productInCart() {
    let products = this.cart.products.map(value => value.product_id)
    let productkey = this.pk
    return products.indexOf(+productkey) > -1 ? true : false

  }
  ngOnInit() {   
    this.auth.cart.subscribe((data:Cart)=> this.cart = data)           
    this.service.getProductDetail(this.pk).subscribe((data) => this.product = data)
  }


}
