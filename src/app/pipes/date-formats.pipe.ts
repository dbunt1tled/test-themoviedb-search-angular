import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormats'
})
export class DateFormatsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === undefined) {
      args = 'LLLL';
    }
    moment.locale('ru');
    return moment(value).format(args);
  }

}
