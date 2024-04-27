import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryResponse } from '../../shared/models/categoryResponse';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryRequest } from '../../shared/requests/category-request';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesUrl = "categories"

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<CategoryResponse[]>{
    
    return this.http.get<CategoryResponse[]>(`${environment.apiUrl}/${this.categoriesUrl}`);
  }

  public deleteCategory(categoryToDeleteId: string): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/${this.categoriesUrl}?categoryToDeleteId=${categoryToDeleteId}`);
  }

  public updateCategory(categoryToUpdateId: string, updatedCategoryRequest: CategoryRequest): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.categoriesUrl}?categoryToUpdateId=${categoryToUpdateId}`, updatedCategoryRequest);
  }

  public addCategory(addCategoryRequest: CategoryRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.categoriesUrl}`, addCategoryRequest);
  }
}
