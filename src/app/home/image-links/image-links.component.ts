import { Component, OnInit } from '@angular/core';
import { GetImagesService } from 'src/app/get-images.service';

@Component({
  selector: 'app-image-links',
  templateUrl: './image-links.component.html',
  styleUrls: ['./image-links.component.css']
})
export class ImageLinksComponent implements OnInit {
  public images
  constructor(private getimages: GetImagesService) { }

  ngOnInit() {

    this.getimages.getImages()
      .subscribe((data) => {
        this.images = data

      })

  }

}
