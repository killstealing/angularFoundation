import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterField: any, keyWord: any): any {
    console.log(filterField, keyWord);
    if (!filterField || !keyWord) {
      return list;
    }
    console.log(list + '' + filterField + keyWord);

    return list.filter(item => item[filterField].indexOf(keyWord) >= 0);
  }

}
