import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DeliveryResponse } from '../../../../shared/models/deliveryResponse';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DeliveryService } from '../../../services/delivery.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateDeliveryService } from '../../../services/update-delivery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-deliveries-table',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './user-deliveries-table.component.html',
  styleUrl: './user-deliveries-table.component.css'
})
export class UserDeliveriesTableComponent implements AfterViewInit, OnInit, OnDestroy {
  private subscription!: Subscription;
  deliveries: DeliveryResponse[] = [];
  httpHeaders: HttpHeaders = new HttpHeaders();

  displayedColumns: string[] = ['address', 'createdAtUtc', 'arrivesAtUtc'];
  dataSource = new MatTableDataSource<DeliveryResponse>(this.deliveries);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchText: string = '';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private deliveryService: DeliveryService, private updateDeliveryService: UpdateDeliveryService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

  ngOnInit(): void {
    this.getDeliveries();
    this.subscription = this.updateDeliveryService.deliveryAttached$.subscribe(() => {
      this.getDeliveries();
    });
  }

  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getDeliveries(): void {
    this.deliveryService.getUserDeliveries(this.httpHeaders).subscribe(
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

}
