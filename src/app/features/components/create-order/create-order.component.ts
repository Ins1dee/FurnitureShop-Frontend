import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';
import { RoundToIntegerPipe } from '../../../core/pipes/round-to-integer.pipe';
import { ProductResponse } from '../../../shared/models/productResponse';
import { HttpHeaders } from '@angular/common/http';
import * as uuid from 'uuid';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { CreateOrderRequest } from '../../../shared/requests/create-order-request';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatPaginatorModule, TruncatePipe, RoundToIntegerPipe],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit, AfterViewInit {
  products: ProductResponse[] = [];
  selectedProducts: ProductResponse[] = [];
  customerName: string = '';
  customerPhone: string = '';
  paymentAmount: number = 0;
  deliveryAddress: string = '';

  httpHeaders: HttpHeaders = new HttpHeaders()
  .set('X-Idempotency-Key', uuid.v4());

  displayedSelectedColumns: string[] = ['name', 'price', 'quantity', 'action'];
  displayedColumns: string[] = ['name', 'description', 'price', 'action'];
  productSource = new MatTableDataSource<ProductResponse>(this.products);
  selectedProductSource = new MatTableDataSource<ProductResponse>(this.products);
  productsDictionary: { [key: string]: number } = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchText: string = '';

  constructor(private productService: ProductService, private orderService: OrderService) {}

  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.productSource.filter = filterValue;
  }

  calculateTotalAmount(): number {
    let totalAmount = 0;
  
    // Iterate over the selected products
    this.selectedProductSource.data.forEach(product => {
      // Multiply the product price by its quantity and add it to the total amount
      totalAmount += product.price * product.quantity;
    });
  
    return totalAmount;
  }
  
  addProduct(product: ProductResponse) {
    console.log(this.selectedProductSource.data);
    const newData = [...this.selectedProductSource.data, product];
    // Assign the new array to the MatTableDataSource
    this.selectedProductSource.data = newData.map(product => ({ ...product, quantity: 1 }));
  }

  removeProduct(product: ProductResponse) {
    // Find the index of the product to remove
    const index = this.selectedProductSource.data.findIndex(item => item === product);
    
    if (index >= 0) {
      // Remove the product from the array using splice
      this.selectedProductSource.data.splice(index, 1);
      
      // Update the MatTableDataSource with the modified data array
      this.selectedProductSource.data = [...this.selectedProductSource.data];
    }
  }

  hasElement(element: ProductResponse) : boolean {
    return this.selectedProductSource.data.some(x => x.id == element.id)
  }

  ngAfterViewInit() {
    this.productSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.productSource = new MatTableDataSource<ProductResponse>(data);
        this.productSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  createOrder(): void {
    this.selectedProductSource.data.forEach(product => {
      this.productsDictionary[product.id] = product.quantity;
    });

    const createOrderRequest = new CreateOrderRequest(
      this.productsDictionary,
      this.customerName,
      this.customerPhone,
      this.paymentAmount,
      this.deliveryAddress
    );

    this.orderService.createOrder(createOrderRequest, this.httpHeaders).subscribe(
      (data) => {
        alert("Successfully created order. You can check it in orders table!")
      },
      (error) => {
        console.error('Error adding product:', error);
        this.httpHeaders = this.httpHeaders.set('X-Idempotency-Key', uuid.v4());
      }
    );
  }
}
