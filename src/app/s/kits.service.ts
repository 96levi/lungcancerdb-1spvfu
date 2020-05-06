import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class KitsService {
  BigINTtoLocaleTime(day: any): string {
    const day2 = new DatePipe('vi-VN').transform(day, 'dd-MM-yyyy');
    return day2;
  }

  BigINTtoLocaleTimeFormat(day: number | string) {
    return new Date(+day);
  }

  LocaleTimetoBigINT(day: Date) {
    return day.getTime();
  }
}
