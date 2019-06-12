import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { ClothinglistComponent } from './clothinglist/clothinglist.component';
import { SpecialorderComponent } from './specialorder/specialorder.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'products',component:ProductListComponent},
  {path:'foodlist',component: FoodlistComponent},
  {path:'clothinglist',component: ClothinglistComponent},
  {path:'specialorders',component:SpecialorderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
