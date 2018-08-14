import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse , HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError , tap, map } from 'rxjs/operators'
import { Iproduct } from "../app/productMaterials/product-interface/Iproduct";
 
@Injectable({
    providedIn : 'root',
    
})

export class ProductService{
    private _productUrl = './api/products/products.json';
  public get productUrl() {
    return this._productUrl;
  }
  public set productUrl(value) {
    this._productUrl = value;
  }
    private   setHeaders() : any {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
  
      return headers;
    }
    /* handlerError */
    private handleError (err : HttpErrorResponse ){
       let errorMessage = '';
       if( err.error instanceof ErrorEvent ){
         errorMessage = `An error occured : ${err.error.message}`
       }
       else{
         errorMessage = `Serve returned code: ${err.status}, error message isi ${err.message} `
       }
       console.log(errorMessage);
       
       return throwError(errorMessage);
    }

    constructor(private http : HttpClient){

    }
    /* get all products from server buy using HTTP request */ 
    getAllProducts(): Observable<Iproduct[]> {
      return this.http.get<Iproduct[]>(this.productUrl).pipe(
        catchError(this.handleError)
      );
    }

    /* get a product buy id */
    
    getProduct(id: number): Observable<Iproduct | undefined> {
      return this.getAllProducts().pipe(
        map((products: Iproduct[]) => products.find(p => p.productId === id))
      );
    }

    setAllProducts(products: Iproduct[]):  Observable<any>{
      //console.log(  JSON.stringify(products));
      return this.http.post<any> (this.productUrl, JSON.stringify(products), this.setHeaders()).pipe(
        catchError(this.handleError)
      );
    }

    deleteProduct( product : Iproduct ){
      console.log(product.productName);
    }

    checkProduct (product : Iproduct ): boolean {
      if( product.productName && product.productCode && product.price ){
        return  true; 
      }
      else {
        return false ;
      }
    }
}