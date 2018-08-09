import { Injectable } from "../../node_modules/@angular/core";
import { Iproduct } from "../app/product/product-interface/Iproduct";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError , tap, map } from 'rxjs/operators'
 
@Injectable({
    providedIn : 'root',
    
})

export class ProductService{

    private productUrl = './api/products/products.json';

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
    getProducts(): Observable<Iproduct[]> {
      return this.http.get<Iproduct[]>(this.productUrl).pipe(
        tap(data => ('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
    }
    /* get a product buy id */
    getProduct(id: number): Observable<Iproduct | undefined> {
      return this.getProducts().pipe(
        map((products: Iproduct[]) => products.find(p => p.productId === id))
      );
    }
    deleteProduct( product : Iproduct ){
      console.log(product.productName);
    }

}