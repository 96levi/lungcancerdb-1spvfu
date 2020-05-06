import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/s/data.service';
import { KitsService } from 'src/app/s/kits.service';

@Component({
  selector: 'app-labo',
  templateUrl: './labo.component.html',
  styleUrls: ['./labo.component.css']
})
export class LaboComponent implements OnInit, OnChanges {
  @Input() stt: number;
  @Input() table: string;
  @Input() dateHos: number;
  @Input() date: number;
  // tslint:disable-next-line: variable-name
  add_view: string;
  laboform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private kits: KitsService,
  ) { }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.laboform = this.fb.group({
      record: [Number, Validators.required],
      stt: [Number, Validators.required],
      dateHos: [Number, Validators.required],
      date: [Number, Validators.required],
      detail: '',
    });
    this.dataService.checkWorkup('CHECK_WORKUP', this.table, this.stt, this.dateHos).subscribe(res => {
      if (res) {
        this.add_view = 'view';
        this.dataService.getData('GET_WORKUP_DATA', this.table, this.stt, this.dateHos, this.date).subscribe(formdata => {
          formdata.date = new Date(+formdata.date);
          formdata.dateHos = new Date(+formdata.dateHos);
          this.laboform.setValue(formdata);
        });
      } else {
        this.add_view = 'add';
        this.dataService.getData('GET_WORKUP_DATA', this.table, this.stt, this.dateHos).subscribe(data => {
          this.laboform.controls.record.setValue(data);
          this.laboform.controls.stt.setValue(this.stt);
          this.laboform.controls.dateHos.setValue(new Date(this.dateHos));
          this.laboform.controls.date.setValue(new Date(this.dateHos));
        });
      }
    });
  }

  onSubmit() {
    if (this.laboform.invalid) {
      alert('Điền thông tin bắt buộc!');
    } else {
      const fbData = this.laboform.value;
      fbData.date = this.laboform.controls.date.value.getTime(); // Locale date to BigINT
      fbData.dateHos = this.laboform.controls.dateHos.value.getTime(); // Locale date to BigINT
      if (this.add_view === 'add') {
        this.dataService.submitButton('ADD', this.table, fbData);
        this.add_view = 'view';
      } else {
        this.dataService.submitButton('CHANGE', this.table, fbData);
      }
      alert('Lưu thành công');
    }
  }

}
