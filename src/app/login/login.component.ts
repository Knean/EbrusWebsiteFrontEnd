import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) { }
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('')
  })

  onSubmit() {
    let password = this.loginForm.controls.password.value
    let username = this.loginForm.controls.userName.value
    console.log(username, password)
    this.auth.login(username,password)
    this.router.navigate(['home'])
  
  }
  cartForm = new FormGroup({
    product_id: new FormControl('',Validators.required)
  })
  
  submitCart(){
    let product_id = this.cartForm.controls.product_id.value
    console.log(product_id, ' this is id from the form')
    console.log(this.cartForm.value,'whole form')
    this.auth.updateCart(product_id)
  }

  ngOnInit() {
  }

}
