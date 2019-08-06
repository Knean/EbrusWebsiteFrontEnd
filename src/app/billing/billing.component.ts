import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { GetImagesService } from '../get-images.service';

declare const Stripe;
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  @Input() amount: number
  @Output() stripeToken = new EventEmitter<string>();

  constructor(public httpclient: GetImagesService) { }
  @ViewChild('card-element') cardelement
  stripe;
  elements;
  card;
  
  public donated = false
  style = {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };
  title = 'AngStripe';

  async handleForm(e:any) {
  
    //e.preventDefault();
    var mario = this
    await this.stripe.createToken(this.card).then(function (result) {
      if (result.error) {
        console.log('we got an error')
        // Inform the customer that there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        mario.stripeToken.emit(result.token)
        /* 
        console.log('no errors')
        mario.httpclient.sendToken(result.token).subscribe((data: any) => {
          console.log(data);
          if (data.success) { console.log(data) }
        })

        
        console.log(result.token, 'result!') */        
      }
    });
  }
  submitWithoutClicking(){
    
    this.handleForm(document.getElementById("stripeForm"));
    
    //(<any>document.getElementById("stripeForm")).submit();
    //(<any>document.getElementsByClassName("ElementsApp")[0]).submit()
  }
  ngOnInit() {
    this.stripe = Stripe('pk_test_yKgVirGOUgNa70uP1uYj45pU')
    var elements = this.stripe.elements();
    this.card = elements.create('card', { style: this.style });
    this.card.mount('#card-element')
    this.card.addEventListener('change', function (event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });


  }
}
