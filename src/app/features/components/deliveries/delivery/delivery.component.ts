import { Component } from '@angular/core';
import { DeliveriesTableComponent } from "../deliveries-table/deliveries-table.component";
import { UserDeliveriesTableComponent } from '../user-deliveries-table/user-deliveries-table.component';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
    selector: 'app-delivery',
    standalone: true,
    templateUrl: './delivery.component.html',
    styleUrl: './delivery.component.css',
    imports: [DeliveriesTableComponent, UserDeliveriesTableComponent]
})
export class DeliveryComponent {

    constructor(private authService: AuthService) {}

isAuthrizedAsDelivery(): boolean {
    return this.authService.isAuthorizedAsDelivery();
}

}
