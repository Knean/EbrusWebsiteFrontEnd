import { AuthenticationService } from '../authentication.service';

export class CartUtilities {
    constructor(private auth: AuthenticationService){}
    
    productInCart(id, cart) {
        let products = cart.products.map(value => value.product_id)
        return products.indexOf(id) > -1 ? true : false
    
      }
    updateCart(id){
        this.auth.updateCart(id)
      }


    
  }