import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryResponse } from '../../shared/models/deliveryResponse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  deliveryUrl = "deliveries";

  constructor(private http: HttpClient) {}

  public getDeliveries(headers: HttpHeaders): Observable<DeliveryResponse[]>{
    
    return this.http.get<DeliveryResponse[]>(`${environment.apiUrl}/${this.deliveryUrl}`, { headers });
  }

  public getUserDeliveries(headers: HttpHeaders): Observable<DeliveryResponse[]>{
    
    return this.http.get<DeliveryResponse[]>(`${environment.apiUrl}/${this.deliveryUrl}/get-user-deliveries`, { headers });
  }

  public attachDelivery(deliveryId: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/${this.deliveryUrl}/attach?deliveryId=${deliveryId}`, null);
  }
}
