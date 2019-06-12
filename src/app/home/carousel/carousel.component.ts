import { Component, OnInit } from '@angular/core';
import { GetImagesService } from 'src/app/get-images.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private getimages: GetImagesService) { }
  public carousel_index = 0
  public images = []
  public selected_image

  carouselPlusOne() {
    this.carousel_index = (this.carousel_index + 1) % (this.images.length)
  }
  nextImage(event) {
    this.carouselPlusOne()

    while (this.images[this.carousel_index].url == false) {
      this.carouselPlusOne()
    }

    this.selected_image = this.images[this.carousel_index].url
  }

  carouselMinusOne() {
    if (this.carousel_index > 0) {
      this.carousel_index = (this.carousel_index - 1)
    }
    else {
      this.carousel_index = this.images.length - 1
    }

  }
  previousImage(event) {
    this.carouselMinusOne()
    while (this.images[this.carousel_index].url == false) {
      this.carouselMinusOne()
    }

    this.selected_image = this.images[this.carousel_index].url
  }

  ngOnInit() {
    this.getimages.getImages()
    .subscribe((data) => {
      this.images = data
      this.selected_image = this.images[this.carousel_index].url
    })
  }

}
