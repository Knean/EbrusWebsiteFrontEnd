import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { ImageLinksComponent } from './home/image-links/image-links.component';
import { LinkCardsComponent } from './home/link-cards/link-cards.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DropdownDirective } from './dropdown.directive';
import { ClothinglistComponent } from './clothinglist/clothinglist.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { SpecialorderComponent } from './specialorder/specialorder.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BillingComponent } from './billing/billing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BillingFormComponent } from './billing-form/billing-form.component';
import { PaymentParentComponent } from './payment-parent/payment-parent.component';
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarouselComponent,
    ImageLinksComponent,
    LinkCardsComponent,
    ProductListComponent,
    DropdownDirective,
    ClothinglistComponent,
    FoodlistComponent,
    SpecialorderComponent,
    ProductDetailComponent,
    BillingComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    CheckoutComponent,
    BillingFormComponent,
    PaymentParentComponent,
    ThankyoupageComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
