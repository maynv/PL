import { Component, OnInit } from "@angular/core";
import { Iproduct } from '../product-interface/IProduct';
import { ProductService } from "../../../services/product.service";
import { ProductNewComponent } from "../product-new/product-new.component"
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
    filteredProducts = <Iproduct[]>{};
    newProduct =  <Iproduct>{};
    products = <Iproduct[]>{};
    deleteProduct : Iproduct;
    errorMessage : string ;
    onRatingClicked(message:string) : void {
        this.title= "Product" +" " + message ;
    }
    
    get listFilter() : string {
        return this._listFilters;
    }

    set listFilter(value: string){
        this._listFilters = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }


    /*  Methods */
    constructor(private productService : ProductService  ){
        this.filteredProducts =this.products ;
        this.listFilter ='';
    }

    ngOnInit() : void{
        // console.log( JSON.parse(window.localStorage.getItem('product')));
        // this.filteredProducts = this.products;
        this.productService.getAllProducts().subscribe(
            products => {
                this.products = products , 
                this.filteredProducts = this.products;
               // console.log(typeof products[0].releaseDate);
               // this.newProduct = products[0];
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
            this.addNewProduct();
        }
    }

    addNewProduct(): void {
        this.products.push(this.newProduct);
        this.newProduct = <Iproduct> {} ;
        console.log(this.newProduct);
        this.updateListProduct();
    }
    
    addToDelete (product) : void {
        this.deleteProduct = product ;
       // console.log(this.__deleteFlag);
    }
    
    productDelete(product): void{
        this.filteredProducts=(this.filteredProducts.filter( x => x.productId !== product.productId ));
        this.products=(this.products.filter( x => x.productId !== product.productId ));
        this.productService.setAllProducts(this.products).subscribe();
    }

    productDeleteList(): void{
      this.filteredProducts=(this.filteredProducts.filter( x => x.productId !== this.deleteProduct.productId ));
      this.products=(this.products.filter( x => x.productId !== this.deleteProduct.productId ));
      this.productService.setAllProducts(this.products).subscribe();
        // console.log(this.products);
        // delete this.filteredProducts[product] ;
    }

    performFilter(filterBy: string): Iproduct[]{
        filterBy=filterBy.toLocaleLowerCase();
        return this.products.filter((product:Iproduct) => 
               product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
            || product.productCode.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    updateListProduct() : void {
        this.filteredProducts = this.performFilter(this._listFilters) ;
        // if(this.products) {
        //     window.localStorage.setItem('product',JSON.stringify(this.products));
        // }
        //this.productService.setAllProducts(this.products).subscribe();
    }

}