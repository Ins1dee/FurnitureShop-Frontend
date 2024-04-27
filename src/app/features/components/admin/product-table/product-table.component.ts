import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductResponse } from '../../../../shared/models/productResponse';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { ProductRequest } from '../../../../shared/requests/product-request';
import { CategoryResponse } from '../../../../shared/models/categoryResponse';
import { CategoryService } from '../../../services/category.service';
import { HttpHeaders } from '@angular/common/http';
import * as uuid from 'uuid';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CategoryTableComponent } from "../category-table/category-table.component";
import { CategoryRequest } from '../../../../shared/requests/category-request';
import { JoinCategoriesPipe } from '../../../../core/pipes/join-categories.pipe';
import { AuthService } from '../../../../shared/services/auth.service';
import { TruncatePipe } from '../../../../core/pipes/truncate.pipe';
import { RoundToIntegerPipe } from '../../../../core/pipes/round-to-integer.pipe';

@Component({
    selector: 'app-product-table',
    standalone: true,
    templateUrl: './product-table.component.html',
    styleUrl: './product-table.component.css',
    imports: [FormsModule, MatTableModule, MatPaginatorModule, CategoryTableComponent, JoinCategoriesPipe, TruncatePipe, RoundToIntegerPipe]
})
export class ProductTableComponent implements OnInit, AfterViewInit{
  products: ProductResponse[] = [];
  categories: CategoryResponse[] = [];
  selectedProduct: ProductResponse | null = null;
  updatedProduct: ProductResponse = new ProductResponse();
  httpHeaders: HttpHeaders = new HttpHeaders()
  .set('X-Idempotency-Key', uuid.v4());

  displayedColumns: string[] = ['name', 'description', 'brandCompany', 'brandCountry', 'price', 'width', 'height', 'length', 'categories', 'action'];
  dataSource = new MatTableDataSource<ProductResponse>(this.products);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedCategory: CategoryResponse | null = null;
  updatedCategoryName: string = '';
  searchText: string = '';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private productService: ProductService, private categoryService: CategoryService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    console.log(this.products);
    console.log(this.dataSource.data);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.dataSource = new MatTableDataSource<ProductResponse>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  isAuthorizedAsAdmin(): boolean {
    return this.authService.isAuthorizedAsAdmin();
  }

  openModal(product: ProductResponse): void {
    this.selectedProduct = product;
  }

  updateProduct(product: ProductResponse | null) {
    if (product) {

      var newCategories = this.updatedProduct.categories.map(category => category.name)

      const updateProductRequest: ProductRequest = {
        name: this.updatedProduct.name,
        description: this.updatedProduct.description,
        brandCompany: this.updatedProduct.brandCompany,
        brandCountry: this.updatedProduct.brandCountry,
        price: this.updatedProduct.price,
        width: this.updatedProduct.width,
        height: this.updatedProduct.height,
        length: this.updatedProduct.length,
        categories: this.updatedProduct.categories
      }

      console.log(updateProductRequest);

      this.productService.updateProduct(product.id, updateProductRequest).subscribe(
        (data) => {
          this.getProducts();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  deleteProduct(product: ProductResponse | null) {
    if (product) {
      this.productService.deleteProduct(product.id).subscribe(
        (data) => {
          this.getProducts();
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  addProduct() {
    const addProductRequest: ProductRequest = {
      name: this.updatedProduct.name,
      description: this.updatedProduct.description,
      brandCompany: this.updatedProduct.brandCompany,
      brandCountry: this.updatedProduct.brandCountry,
      price: this.updatedProduct.price,
      width: this.updatedProduct.width,
      height: this.updatedProduct.height,
      length: this.updatedProduct.length,
      categories: this.updatedProduct.categories
    }

    console.log(addProductRequest);

    this.productService.addProduct(addProductRequest, this.httpHeaders).subscribe(
      (data) => {
        this.getProducts();
      },
      (error) => {
        console.error('Error adding product:', error);
        this.httpHeaders = this.httpHeaders.set('X-Idempotency-Key', uuid.v4());
      }
    );
    }

    openCategoryModal(category: CategoryResponse): void {
      this.selectedCategory = category;
    }
  
    updateCategory(category: CategoryResponse | null): void {
      if (category) {
  
        const updateCategoryRequest: CategoryRequest = {
          name: this.updatedCategoryName
        }
  
        this.categoryService.updateCategory(category.id, updateCategoryRequest).subscribe(
          (data) => {
            this.getCategories();
          },
          (error) => {
            console.error('Error updating category:', error);
          }
        );
      }
    }
  
    modalClosed(): void {
      this.selectedCategory = null;
    }
  
    deleteCategory(category: CategoryResponse | null): void {
      if (category) {
        this.categoryService.deleteCategory(category.id).subscribe(
          (data) => {
            this.getCategories();
          },
          (error) => {
            console.error('Error deleting category:', error);
          }
        );
      }
    }
  
    addCategory() {
      const addCategoryRequest: CategoryRequest = {
        name: this.updatedCategoryName
      }
  
      this.categoryService.addCategory(addCategoryRequest).subscribe(
        (data) => {
          this.getCategories();
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
}
