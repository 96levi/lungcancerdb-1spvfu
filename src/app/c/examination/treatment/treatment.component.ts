import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/s/data.service';
import { KitsService } from 'src/app/s/kits.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit, OnChanges {
  @Input() stt: number;
  @Input() table: string;
  @Input() dateHos: number;
  @Input() date: number;
  // tslint:disable-next-line: variable-name
  @Input() add_view: string;
  treatmentform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private kits: KitsService,
  ) { }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.treatmentform = this.fb.group({
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
          this.treatmentform.setValue(formdata);
        });
      } else {
        this.add_view = 'add';
        this.dataService.getData('GET_WORKUP_DATA', this.table, this.stt, this.dateHos).subscribe(data => {
          this.treatmentform.controls.record.setValue(data);
          this.treatmentform.controls.stt.setValue(this.stt);
          this.treatmentform.controls.dateHos.setValue(new Date(this.dateHos));
          this.treatmentform.controls.date.setValue(new Date(this.dateHos));
        });
      }
    });
  }

  onSubmit() {
    if (this.treatmentform.invalid) {
      alert('Điền thông tin bắt buộc!');
    } else {
      const fbData = this.treatmentform.value;
      fbData.date = this.treatmentform.controls.date.value.getTime(); // Locale date to BigINT
      fbData.dateHos = this.treatmentform.controls.dateHos.value.getTime(); // Locale date to BigINT
      this.date = fbData.date; // change data to send to ImageRenderComponent
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
