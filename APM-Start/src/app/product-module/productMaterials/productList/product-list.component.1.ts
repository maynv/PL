import { Component, OnInit } from "@angular/core";
import { Iproduct } from '../product-interface/Iproduct'; 
import * as MV from "../../../define/define"
import { ProductService } from "../../../../services/product.service";
@Component({
    // selector : "pm-products",
    templateUrl : "./product-list.component.html",
    styleUrls : ["./product-list.component.css" ],
})

export class ProductListComponent implements OnInit{
    /* flags */
    __showImage : boolean = false;
    __deleteFlag : boolean = false ;
    /* properties */
    title : string="Product list";
    imageWidth : number=50;
    imageMargin : number=2;
    _listFilters : string;
    currency :"$";
    filteredProducts = MV.PRODUCT.PRODUCTFILTERED ;
    newProduct =  <Iproduct>{} ;
    products = MV.PRODUCT.LISTPRODUCT;
    deleteProduct =  <Iproduct>{};
    errorMessage : string ;
    onRatingClicked(message:string) : void {
        this.title= "Product" +" " + message ;
    }
    
    get listFilter() : string {
        return this._listFilters;
    }

    set listFilter(value: string){
        this._listFilters = value;
        MV.PRODUCT.PRODUCTFILTERED = this.listFilter ? this.performFilter(this.listFilter) : MV.PRODUCT.LISTPRODUCT;
    }


    /*  Methods */
    constructor(private productService : ProductService  ){
        MV.PRODUCT.PRODUCTFILTERED =MV.PRODUCT.LISTPRODUCT ;
        this.listFilter ='';
    }

    ngOnInit() : void{
        this.productService.getAllProducts().subscribe(
            products => {
                MV.PRODUCT.LISTPRODUCT = products , 
                MV.PRODUCT.PRODUCTFILTERED = MV.PRODUCT.LISTPRODUCT;
              //  console.log( "Got " + products)
            },
            error => this.errorMessage = <any>error 
        );
    }

    toogleImage() : void{
        this.__showImage = !this.__showImage;
    }

    takeNewProduct(product : Iproduct ): void {
        if (this.productService.checkProduct(product) === true ){
            this.newProduct = product ;
            product.productId = MV.PRODUCT.LISTPRODUCT.length +1 ;
            this.addNewProduct();
        }
    }

    addNewProduct(): void {
        MV.PRODUCT.LISTPRODUCT.push(this.newProduct);    
        this.updateListProduct();
        this.newProduct = <Iproduct> {} ;
        console.log(MV.PRODUCT.LISTPRODUCT);
    }
    
    addToDelete (product) : void {
        this.deleteProduct = product ;
       // console.log(this.__deleteFlag);
    }
    
    productDelete(product): void{
        MV.PRODUCT.PRODUCTFILTERED=(MV.PRODUCT.PRODUCTFILTERED.filter( x => x.productId !== product.productId ));
        MV.PRODUCT.LISTPRODUCT=(MV.PRODUCT.LISTPRODUCT.filter( x => x.productId !== product.productId ));
        this.productService.setAllProducts(MV.PRODUCT.LISTPRODUCT).subscribe();
    }

    productDeleteList(): void{
      MV.PRODUCT.PRODUCTFILTERED=(MV.PRODUCT.PRODUCTFILTERED.filter( x => x.productId !== this.deleteProduct.productId ));
      MV.PRODUCT.LISTPRODUCT=(MV.PRODUCT.LISTPRODUCT.filter( x => x.productId !== this.deleteProduct.productId ));
      this.productService.setAllProducts(MV.PRODUCT.LISTPRODUCT).subscribe();
        // console.log(this.products);
        // delete MV.PRODUCT.PRODUCTFILTERED[product] ;
    }

    performFilter(filterBy: string): Iproduct[]{
        filterBy=filterBy.toLocaleLowerCase();
        return MV.PRODUCT.LISTPRODUCT.filter((product:Iproduct) => 
               product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
            || product.productCode.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    updateListProduct() : void {
        if ( this._listFilters ){
            MV.PRODUCT.PRODUCTFILTERED = this.performFilter(this._listFilters) ;
        }else {
            MV.PRODUCT.PRODUCTFILTERED = MV.PRODUCT.LISTPRODUCT ;
        }
      
        // if(this.products) {
        //     window.localStorage.setItem('product',JSON.stringify(this.products));
        // }
        //this.productService.setAllProducts(this.products).subscribe();
    }

}