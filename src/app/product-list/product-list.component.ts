import { Component, OnInit } from '@angular/core';
import { GetImagesService } from '../get-images.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public images
  constructor(private getimages: GetImagesService) { }


  ngOnInit() {
    this.getimages.getImages()
    .subscribe((data) => {
      this.images = data

    })
  }

}
