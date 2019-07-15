import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { and } from '@angular/router/src/utils/collection';
import { AuthenticationService } from '../authentication.service';
import { GetCookiesService } from '../get-cookies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor( 
    private auth: AuthenticationService,
    private cookie:GetCookiesService,
    private router: Router){}

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    passwords: new FormGroup({
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
    }, { validators: this.passwordsMatch })

  })
  passwordsMatch(group: FormGroup): { [key: string]: boolean } {
    let pass1 = group.get('password')
    let pass2 = group.get('repeatPassword')
  
    if (pass1.value !== pass2.value && pass1.dirty && pass2.dirty) {
      return { 'passwordsDontMatch': true }
    }
    return null
  }
  onSubmit() {
    let password = this.registerForm.controls.passwords.get("password").value
    let username = this.registerForm.controls.userName.value    
    this.auth.register(username,password)
    this.router.navigate(['home'])

  }
 

  ngOnInit() {

  }

}
