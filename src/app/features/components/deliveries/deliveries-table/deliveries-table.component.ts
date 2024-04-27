import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryResponse } from '../../../../shared/models/deliveryResponse';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DeliveryService } from '../../../services/delivery.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateDeliveryService } from '../../../services/update-delivery.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-deliveries-table',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './deliveries-table.component.html',
  styleUrl: './deliveries-table.component.css'
})
export class DeliveriesTableComponent implements AfterViewInit, OnInit {
  deliveries: DeliveryResponse[] = [];
  selectedDelivery: DeliveryResponse | null = null;
  httpHeaders: HttpHeaders = new HttpHeaders();

  displayedColumns: string[] = ['address', 'createdAtUtc', 'arrivesAtUtc', 'delivered', 'userName', 'action'];
  dataSource = new MatTableDataSource<DeliveryResponse>(this.deliveries);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchText: string = '';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private deliveryService: DeliveryService, private updateDeliveryService: UpdateDeliveryService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getDeliveries();
  }

  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getDeliveries(): void {
    this.deliveryService.getDeliveries(this.httpHeaders).subscribe(
      (data) => {
        this.deliveries = data;
        this.dataSource = new MatTableDataSource<DeliveryResponse>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching deliveries:', error);
      }
    );
  }

  attachDelivery(delivery: DeliveryResponse) : void {
    this.deliveryService.attachDelivery(delivery.id).subscribe(
      (data) => {
        this.getDeliveries();
        this.updateDeliveryService.deliveryAttached();
      },
      (error) => {
        console.error('Error attaching delivery:', error);
      }
    );
  }

  isAuthrizedAsDelivery(): boolean {
    return this.authService.isAuthorizedAsDelivery();
  }

  openModal(delivery: DeliveryResponse): void {
    this.selectedDelivery = delivery;
  }
}
