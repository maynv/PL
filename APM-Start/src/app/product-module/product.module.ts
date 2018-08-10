import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared-module/shared.module';
import { ProductListComponent } from '../productMaterials/productList/product-list.component';
import { ProductDetailGuard } from '../productMaterials/product-guard/product-detail.guard';
import { ProductDetailComponent } from '../productMaterials/productDetail/product-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path : 'products', component : ProductListComponent },
      { 
        path : 'products/:id',
        canActivate : [ProductDetailGuard],
        component : ProductDetailComponent 
      },
    ]),
    SharedModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ]
})
export class ProductModule { }
