import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundToInteger',
  standalone: true
})
export class RoundToIntegerPipe implements PipeTransform {

  transform(value: number): number {
    return Math.round(value);
  }

}
