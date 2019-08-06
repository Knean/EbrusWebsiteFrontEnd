import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService, User, Address } from '../authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.css']
})
export class BillingFormComponent implements OnInit {
  @Output() addressEmitter = new EventEmitter<Address>()
  constructor(private auth: AuthenticationService, private router: Router) { }
  public user: User

  addressForm = new FormGroup({
    address_line_1: new FormControl('', Validators.required),
    address_line_2: new FormControl('')
  })
  onSubmit() {
    let address_line_1 = this.addressForm.controls.address_line_1.value
    let address_line_2 = this.addressForm.controls.address_line_2.value
    this.auth.createAddress(address_line_1, address_line_2).subscribe(
      
      (data: any) => { 
          this.addressEmitter.emit(data)
               
        //this.router.navigate(['billing'])
      }
    )
    
  }
  ngOnInit() {
    this.auth.user.subscribe((data: User) => this.user = data)
    console.log(this.user)
  }

}
