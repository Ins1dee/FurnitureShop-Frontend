import { Component } from '@angular/core';
import { CategoryTableComponent } from "./category-table/category-table.component";
import { ProductTableComponent } from "./product-table/product-table.component";

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [CategoryTableComponent, ProductTableComponent]
})
export class AdminComponent {

}
