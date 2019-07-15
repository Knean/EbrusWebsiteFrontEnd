import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetCookiesService } from './get-cookies.service';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user_object = {name:'someuser',age:'28'}
  public user = new BehaviorSubject <any>(this.user_object)  
 
  
  
  //public user = {name: 'mariouser',age:'29'}
  constructor(private http: HttpClient, private cookie: GetCookiesService) { }
  
  register(username,password){
    this.http.post("http://127.0.0.1:8000/api/register",{"username":username, "password":password})
    .subscribe(()=>{
      this.login(username,password);
      this.get_user()
    })
    
  }
  get_user(){
    this.http.get("http://127.0.0.1:8000/api/get_user").subscribe((data: any)=>{
      if (data.name){
        this.user.next(data)
      }
      else{
        this.user.next('')
      }
      
    })
  }
  login(username,password){
     let csrf = this.cookie.getCookie('csrftoken')
    console.log(csrf, 'csrf token')
    let csrfheader = new HttpHeaders({'X-CSRFToken':csrf})
    
    this.http.post("http://127.0.0.1:8000/api/login",{"username":username, "password":password},{headers:csrfheader}).
    subscribe(()=>this.get_user())
    
  
  }
  logout(){
     
    this.http.get("http://127.0.0.1:8000/api/logout").subscribe(()=> this.get_user())
    
    
    
    
    
  }
}
