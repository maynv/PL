import { Component } from "../../node_modules/@angular/core";
import { ProductListComponent } from "../../src/app/product/product-list.component";
/* define component decorator */
@Component ({
  selector :'pm-root',
  templateUrl : "../template/app.template.html"
})
/* define app component */
export class AppComponent {
  pageTitle : String = ' View Product ';
}