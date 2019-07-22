import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetImagesService {

  constructor(private http: HttpClient) { }
  //public baseURL = document.URL.split('/').splice(0,3).join('/') + '/' 
  public getImages() {
    return this.http.get
      (
        "https://firestore.googleapis.com/v1/projects/ebrusproducts/databases/(default)/documents/images"
      ).pipe(
        map((value: any) => {
          var fixedobject = []
          for (var i = 0; i < value.documents.length; ++i) {
            fixedobject.push({
              url: value.documents[i].fields.url.stringValue,
              name: value.documents[i].fields.name.stringValue
            })
          }
          return fixedobject
        }))

  }
  public searchProducts(query){
    return this.http.get(
      `https://evening-taiga-61292.herokuapp.com/api/search/${query}`
    )
  }

  public getProducts() {
    return this.http.get
      (
        "https://evening-taiga-61292.herokuapp.com/api/products"
      )
  }

  public getProductDetail(pk){
    return this.http.get
    (
      `https://evening-taiga-61292.herokuapp.com/api/products/${pk}`
    )
  }
  public sendToken(token){
    return this.http.post("https://evening-taiga-61292.herokuapp.com/api/charge",{"token":token.id})
  }
}