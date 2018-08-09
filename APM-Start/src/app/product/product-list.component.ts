import { Component, OnInit} from "../../../node_modules/@angular/core";
import { Iproduct } from './product-interface/Iproduct';
import { ProductService } from "../../services/product.service";

@Component({
    // selector : "pm-products",
    templateUrl : "./product-list.component.html",
    styleUrls : ["./product-styles/product-list.component.css" ],


})

export class ProductListComponent implements OnInit{
    /* flags */
    __showImage : boolean = true;
    /* properties */
    title : string="Product list";
    imageWidth : number=50;
    imageMargin : number=2;
    _listFilters : string;
    currency :"$";
    filteredProducts : Iproduct[];
    products : Iproduct[];
    errorMessage : string ;
    onRatingClicked(message:string) : void {
        this.title= "Product" +" " + message ;
    }
    
    get listFilter() : string {
        return this._listFilters;
    }

    set listFilter(value: string){
        this._listFilters=value;
        this.filteredProducts=this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }


    /*  Methods */
    constructor(private productService : ProductService){
        this.filteredProducts =this.products ;
        this.listFilter ='';
    }

    ngOnInit() : void{
        this.productService.getProducts().subscribe(
            products => {
                this.products = products , 
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error 
        );
       
    }

    toogleImage() : void{
        this.__showImage = !this.__showImage;

    }

    productDelete(product): void{
      this.filteredProducts=(this.filteredProducts.filter( x => x.productId !== product.productId ));
       console.log(this.products);
        // delete this.filteredProducts[product] ;
    }

    performFilter(filterBy: string): Iproduct[]{
        filterBy=filterBy.toLocaleLowerCase();
        return this.products.filter((product:Iproduct) => 
               product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
            || product.productCode.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}