import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { ClothinglistComponent } from './clothinglist/clothinglist.component';
import { SpecialorderComponent } from './specialorder/specialorder.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BillingComponent } from './billing/billing.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BillingFormComponent } from './billing-form/billing-form.component';
import { PaymentParentComponent } from './payment-parent/payment-parent.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'products',component:ProductListComponent},
  {path:'foodlist',component: FoodlistComponent},
  {path:'clothinglist',component: ClothinglistComponent},
  {path:'specialorders',component:SpecialorderComponent},
  {path:'detail/:pk',component:ProductDetailComponent},
  {path:'donate',component:BillingComponent},
  {path:'register',component: RegisterComponent},
  {path:'profile',component: ProfileComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'address',component:BillingFormComponent},
  {path:'billing',component: PaymentParentComponent},
  {path:'order',component:OrderDetailComponent},
  {path: "**",redirectTo:"home"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
