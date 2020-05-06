import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/s/data.service';
import { KitsService } from 'src/app/s/kits.service';

@Component({
  selector: 'app-show-info-by-range',
  templateUrl: './show-info-by-range.component.html',
  styleUrls: ['./show-info-by-range.component.css']
})
export class ShowInfoByRangeComponent implements OnInit, OnChanges {
  @Input() range: Date[];
  @Input() stt: number;
  dateHos: any[];
  totalDateHos: number;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private kits: KitsService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.dataService.getAllClinic(this.stt, this.range[0].getTime(), this.range[1].getTime()).subscribe(res => {
      this.dateHos = res;
      this.totalDateHos = this.dateHos.length;
    });
  }

  BigINTtoLocaleTime(day: any) {
    return this.kits.BigINTtoLocaleTime(day);
  }
}
