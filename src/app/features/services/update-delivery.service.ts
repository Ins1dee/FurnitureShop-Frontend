import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateDeliveryService {

  private deliveryAttachedSource = new Subject<void>();

  deliveryAttached$ = this.deliveryAttachedSource.asObservable();

  constructor() {}

  deliveryAttached() {
    this.deliveryAttachedSource.next();
  }
}
