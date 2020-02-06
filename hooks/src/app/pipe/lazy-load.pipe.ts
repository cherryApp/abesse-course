import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lazyLoad'
})
export class LazyLoadPipe implements PipeTransform {

  valueCache: any[] = [];
  initLength = 100;

  transform(value: any[], page: number = 1, paginator: boolean = false, lgt: number = 50): any {
    if (!value || !Array.isArray(value)) {
      return value;
    }

    this.valueCache = value.slice();

    const startIndex = paginator ? (page - 1) * lgt : 0;
    return this.valueCache.slice(startIndex, lgt * page);
  }

}
