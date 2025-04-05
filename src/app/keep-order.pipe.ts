import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keepOrder'
})
export class KeepOrderPipe implements PipeTransform {

  transform(value: any): any[] {
    if (!value) {
      return [];
    }
    return Object.keys(value).map(key => ({ key, value: value[key] }));
  }

}
