import { Component, OnInit, ViewChild } from '@angular/core';
import { GetImagesService } from '../get-images.service';
declare const Stripe;
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {


  constructor(public httpclient: GetImagesService) { }
  @ViewChild('card-element') cardelement
  stripe;
  elements;
  card;
  public amount = 500
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

  async handleForm(e) {
    e.preventDefault();
    var mario = this
    await this.stripe.createToken(this.card).then(function (result) {
      if (result.error) {
        // Inform the customer that there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        mario.httpclient.sendToken(result.token).subscribe((data: any) => {
          console.log(data);
          if (data.success) { this.donated = true }
        })

        // Send the token to your server.
        console.log(result.token, 'result!')
        /* stripeTokenHandler(result.token); */
      }
    });
  }
  ngOnInit() {
    this.stripe = Stripe('pk_test_yKgVirGOUgNa70uP1uYj45pU')
    console.log('striiiiiiiipe', this.stripe)

    var elements = this.stripe.elements();
    this.card = elements.create('card', { style: this.style });
    this.card.mount('#card-element')
    console.log("this is stripe")
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
