import { Component, OnInit } from '@angular/core';
import { GetImagesService } from '../get-images.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public images
  constructor(private getimages: GetImagesService, private activeroute: ActivatedRoute,private router: Router) { }
  loadresults(query) {

    this.getimages.searchProducts(this.activeroute.snapshot.queryParams.search).subscribe((data) => {
      this.images = data

    })
  }
  loadallresults() {
    this.getimages.getProducts()
      .subscribe((data) => {
        this.images = data

      })
  }
  navigate(event:any){
    /* console.log(event.target.dataset) */
    this.router.navigate([`detail/${event.target.dataset.index}`])

  }
  ngOnInit() {




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
