import { NgModule } from '@angular/core';
import { ProductListComponent } from '../product/product-list.component';
import { ProductDetailComponent } from '../product/product-detail.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { ProductDetailGuard } from '../product/product-guard/product-detail.guard';
import { SharedModule } from '../shared-module/shared.module';

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
