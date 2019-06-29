import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetImagesService } from '../get-images.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: GetImagesService) { }
  public product
  public displayedImage
  imgClick(event: any){
    console.log(event.target.dataset.index)
    let index = event.target.dataset.index
    this.displayedImage = this.product.image_set[index].url
  }
  ngOnInit() {
    let pk = this.route.snapshot.paramMap.get('pk');

    this.service.getProductDetail(pk).subscribe((data) => this.product = data)
  }


}
