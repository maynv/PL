import { Component, OnInit} from "../../../node_modules/@angular/core";
import { Iproduct } from 'src/app/product/Iproduct';

@Component({
    selector : "pm-products",
    templateUrl : "./product-list.component.html",
    styleUrls : ["./product-list.component.css" ],
})

export class ProductListComponent implements OnInit{
    /* constructor */

    /* flags */
    __showImage : boolean = false;
    /* properties */
    title : string="Product list";
    imageWidth : number=50;
    imageMargin : number=2;
    _listFilters : string;
    currency :"$";
    
    
    get listFilter() : string {
        return this._listFilters;
    }

    set listFilter(value: string){
        this._listFilters=value;
        this.filteredProducts=this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts : Iproduct[];
    products : Iproduct[]=[
        {
            "productId" : 2,
            "productName" : "Garden Cart",
            "productCode" : "SOJ-013",
            "releaseDate" : "March 18, 2017",
            "productDescription" : " 20% Hight perfoment better than older version.",
            "productPrice" : 32.99,
            "productRating" : 4.3,
            "productImageUrl" :"gardenCart.png"
        },
        {
            "productId" : 3,
            "productName" : "Hammer",
            "productCode" : "SOJ-023",
            "releaseDate" : "March 18, 2017",
            "productDescription" : " 20% Hight perfoment better than older version.",
            "productPrice" : 3.99,
            "productRating" : 4.2,
            "productImageUrl" :"hammer.png"
        }
    ];

    /*  Methods */
    constructor(){
        this.filteredProducts =this.products ;
        this.listFilter ='';
    }

    ngOnInit() : void{

    }

    toogleImage() : void{
        this.__showImage = !this.__showImage;

    }

    productDelete(): void{

    }

    performFilter(filterBy: string): Iproduct[]{
        filterBy=filterBy.toLocaleLowerCase();
        return this.products.filter((product:Iproduct) => 
               product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
            || product.productCode.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}