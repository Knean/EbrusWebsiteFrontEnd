import { Component, OnInit } from '@angular/core';
import { GetImagesService } from 'src/app/get-images.service';

@Component({
  selector: 'app-link-cards',
  templateUrl: './link-cards.component.html',
  styleUrls: ['./link-cards.component.css']
})
export class LinkCardsComponent implements OnInit {
  public images
  constructor(private getimages: GetImagesService) { }

  ngOnInit() {

    this.getimages.getImages()
      .subscribe((data) => {
        this.images = data

      })

  }

}
