import { Component, OnInit , Input, OnChanges  ,  EventEmitter , Output } from '@angular/core';
import { Iproduct } from '../product-interface/IProduct';


@Component({
  selector: 'pm-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
  
})
export class ProductNewComponent implements OnChanges {
  @Input() childnewProduct : Iproduct;
  @Output() commitNew = new EventEmitter<Iproduct>();

  constructor() { 

  }

  ngOnChanges() {

  }
  commitNewProduct( product : Iproduct ):void{
    this.commitNew.emit(product);
  } 
  veridationData() : void {
    this.commitNewProduct(this.childnewProduct);
  }
 
}
