import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'arrayToString'})
export class ArrayToString implements PipeTransform {
  transform(value: any) {
    if (value instanceof Array) {
      return value.toString().replace(/,/g, ', ');
    }

    return value;
  }
}
