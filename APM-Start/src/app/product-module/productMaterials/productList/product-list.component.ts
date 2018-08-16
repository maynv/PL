import { Component, OnInit } from "@angular/core";
import { Iproduct } from '../product-interface/Iproduct';
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
    MV = {
        _listFilters : <string> {},
        currency :"$" ,
        filteredProducts : <Iproduct[]>{} ,
        newProduct :  <Iproduct>{},
        products : <Iproduct[]>{},
        deleteProduct : <Iproduct>{},
        errorMessage : <string>{},
    }

    onRatingClicked(message:string) : void {
        this.title= "Product" +" " + message ;
    }
    
    get listFilter() : string {
        return this.MV._listFilters;
    }

    set listFilter(value: string){
        this.MV._listFilters = value;
        this.MV.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.MV.products;
    }


    /*  Methods */
    constructor(private productService : ProductService  ){
        this.MV.filteredProducts =this.MV.products ;
        this.listFilter ='';
    }

    ngOnInit() : void{
        this.productService.getAllProducts().subscribe(
            products => {
                this.MV.products = products , 
                this.MV.filteredProducts = this.MV.products;
              //  console.log( "Got " + products)
            },
            error => this.MV.errorMessage = <any>error 
        );
    }

    toogleImage() : void{
        this.__showImage = !this.__showImage;
    }

    takeNewProduct(product : Iproduct ): void {
        if (this.productService.checkProduct(product) === true ){
            this.MV.newProduct = product ;
            product.productId = this.MV.products.length +1 ;
            this.addNewProduct();
        }
    }

    addNewProduct(): void {
        this.MV.products.push(this.MV.newProduct);    
        this.updateListProduct();
        this.MV.newProduct = <Iproduct> {} ;
        console.log(this.MV.products);
    }
    
    addToDelete (product) : void {
        this.MV.deleteProduct = product ;
       // console.log(this.__deleteFlag);
    }
    
    productDelete(product): void{
        this.MV.filteredProducts=(this.MV.  filteredProducts.filter( x => x.productId !== product.productId ));
        this.MV.products=(this.MV.products.filter( x => x.productId !== product.productId ));
        this.productService.setAllProducts(this.MV.products).subscribe();
    }

    productDeleteList(): void{
      this.MV.filteredProducts=(this.MV.filteredProducts.filter( x => x.productId !== this.MV.deleteProduct.productId ));
      this.MV.products=(this.MV.products.filter( x => x.productId !== this.MV.deleteProduct.productId ));
      this.productService.setAllProducts(this.MV.products).subscribe();
        // console.log(this.products);
        // delete this.filteredProducts[product] ;
    }

    performFilter(filterBy: string): Iproduct[]{
        filterBy=filterBy.toLocaleLowerCase();
        return this.MV.products.filter((product:Iproduct) => 
               product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
            || product.productCode.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    updateListProduct() : void {
        if ( this.MV._listFilters ){
            this.MV.filteredProducts = this.performFilter(this.MV._listFilters) ;
        }else {
            this.MV.filteredProducts = this.MV.products ;
        }
      
        // if(this.products) {
        //     window.localStorage.setItem('product',JSON.stringify(this.products));
        // }
        //this.productService.setAllProducts(this.products).subscribe();
    }

}