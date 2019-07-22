import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from './interface';
import { GetImagesService } from './get-images.service';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetImagesService]
})
export class AppComponent implements OnInit {
  public images = []
  constructor(
    private http: HttpClient, 
    private getimages: GetImagesService,
    private auth: AuthenticationService) { }

  title = 'ebrusite';
  ngOnInit() {
    this.getimages.getImages()
      .subscribe((data) => { console.log("original data ", data), this.images = data, console.log(this.images) })
    this.auth.refreshCart()
  }
  
}
