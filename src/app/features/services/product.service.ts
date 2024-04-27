import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductResponse } from '../../shared/models/productResponse';
import { ProductRequest } from '../../shared/requests/product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsUrl = "products"

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<ProductResponse[]>{
    
    return this.http.get<ProductResponse[]>(`${environment.apiUrl}/${this.productsUrl}`);
  }

  public deleteProduct(productToDeleteId: string): Observable<any>{
    console.log("Id:" + productToDeleteId);
    return this.http.delete(`${environment.apiUrl}/${this.productsUrl}?productToDeleteId=${productToDeleteId}`);
  }

  public updateProduct(productToUpdateId: string, updatedproductRequest: ProductRequest): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.productsUrl}?productToUpdateId=${productToUpdateId}`, updatedproductRequest);
  }

  public addProduct(addProductRequest: ProductRequest, headers: HttpHeaders): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.productsUrl}`, addProductRequest, {headers: headers});
  }
}
