import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinCategories',
  standalone: true
})
export class JoinCategoriesPipe implements PipeTransform {
  transform(categories: any[]): string {
    if (!categories || categories.length === 0) {
      return '';
    }

    return categories.map(category => category.name).join(', ');
  }
}