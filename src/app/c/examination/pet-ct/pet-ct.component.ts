import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/s/data.service';
import { KitsService } from 'src/app/s/kits.service';

@Component({
  selector: 'app-pet-ct',
  templateUrl: './pet-ct.component.html',
  styleUrls: ['./pet-ct.component.css']
})
export class PETCTComponent implements OnInit, OnChanges {
  @Input() stt: number;
  @Input() table: string;
  @Input() dateHos: number;
  @Input() date: number;
  // tslint:disable-next-line: variable-name
  add_view: string;
  petctform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private kits: KitsService,
  ) { }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.petctform = this.fb.group({
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
          this.petctform.setValue(formdata);
        });
      } else {
        this.add_view = 'add';
        this.dataService.getData('GET_WORKUP_DATA', this.table, this.stt, this.dateHos).subscribe(data => {
          this.petctform.controls.record.setValue(data);
          this.petctform.controls.stt.setValue(this.stt);
          this.petctform.controls.dateHos.setValue(new Date(this.dateHos));
          this.petctform.controls.date.setValue(new Date(this.dateHos));
        });
      }
    });
  }

  onSubmit() {
    if (this.petctform.invalid) {
      alert('Điền thông tin bắt buộc!');
    } else {
      const fbData = this.petctform.value;
      fbData.date = this.petctform.controls.date.value.getTime(); // Locale date to BigINT
      fbData.dateHos = this.petctform.controls.dateHos.value.getTime(); // Locale date to BigINT
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
