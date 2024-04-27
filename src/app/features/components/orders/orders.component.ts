import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { OrderResponse } from "../../../shared/models/orderResponse";
import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../../shared/services/auth.service";
import { OrderService } from "../../services/order.service";
import * as uuid from 'uuid';
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements AfterViewInit, OnInit {

  orders: OrderResponse[] = [];
  selectedOrder: OrderResponse | null = null;
  httpHeaders: HttpHeaders = new HttpHeaders()
    .set('X-Idempotency-Key', uuid.v4());

  displayedColumns: string[] = ['sellerName', 'customerName', 'customerPhone', 'createdAtUtc', 'totalAmount', 'paymentStatus', 'action'];
  dataSource = new MatTableDataSource<OrderResponse>(this.orders);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchText: string = '';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getOrders(): void {
    this.orderService.getOrders(this.httpHeaders).subscribe(
      (data) => {
        this.orders = data;
        this.dataSource = new MatTableDataSource<OrderResponse>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  getPdf(order: OrderResponse) : void {
    this.orderService.getPdf(order.id, this.httpHeaders).subscribe(
      (data: Blob) => {
        this.httpHeaders = this.httpHeaders.set('X-Idempotency-Key', uuid.v4());
        // Create a blob URL for the PDF data
        const blobUrl = URL.createObjectURL(data);

        // Create an anchor element
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `invoice-${order.id}.pdf`; // Set the download attribute

        // Append the anchor element to the body and click it programmatically
        document.body.appendChild(a);
        a.click();

        // Clean up: remove the anchor element and revoke the blob URL
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      },
      (error) => {
        this.httpHeaders = this.httpHeaders.set('X-Idempotency-Key', uuid.v4());
        console.error('Error fetching PDF:', error);
      }
    );
  }

  isAuthorizedAsSeller() : boolean {
    return this.authService.isAuthorizedAsSeller();
  }
}