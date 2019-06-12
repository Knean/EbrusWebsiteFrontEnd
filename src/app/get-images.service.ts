import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetImagesService {

  constructor(private http: HttpClient) { }
  public getImages() {
    return this.http.get
      (
        "https://firestore.googleapis.com/v1/projects/ebrusproducts/databases/(default)/documents/images"
      ).pipe(
        map((value:any) => {
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
}
