import { Component, OnInit } from '@angular/core';
import { CategoryResponse } from '../../../../shared/models/categoryResponse';
import { CategoryService } from '../../../services/category.service';
import { FormsModule } from '@angular/forms';
import { CategoryRequest } from '../../../../shared/requests/category-request';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent implements OnInit {
  categories: CategoryResponse[] = [];
  selectedCategory: CategoryResponse | null = null;
  updatedCategoryName: string = '';

  constructor(private categoryService: CategoryService) {}
  
  ngOnInit(): void {
    this.getCategories();
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
