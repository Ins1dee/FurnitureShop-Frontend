import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderResponse } from '../../shared/models/orderResponse';
import { environment } from '../../../environments/environment';
import { CreateOrderRequest } from '../../shared/requests/create-order-request';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl = "orders";

  constructor(private http: HttpClient) {}

  public getOrders(headers: HttpHeaders): Observable<OrderResponse[]>{
    
    return this.http.get<OrderResponse[]>(`${environment.apiUrl}/${this.orderUrl}`, { headers });
  }

  public getPdf(id: string, headers: HttpHeaders): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiUrl}/${this.orderUrl}/invoice-report?orderId=${id}`, {
      headers,
      responseType: 'blob' as 'json'
    });
  }

  public createOrder(createOrderRequest: CreateOrderRequest, headers: HttpHeaders) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.orderUrl}`, createOrderRequest, {headers});
  }
}
