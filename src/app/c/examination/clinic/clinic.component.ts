import { Observable } from 'rxjs/internal/Observable';
import { KitsService } from './../../../s/kits.service';
import { DataService } from './../../../s/data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnChanges, OnInit, Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../../store/action';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnChanges, OnInit {

  @Input() stt: number;
  @Input() day: number;
  // tslint:disable-next-line: variable-name
  @Input() add_view: string;

  workupDate$: Observable<any>;

  clinicForm: FormGroup;
  SubmitButtonCondition = 'ADD';
  workup = [{ vi: 'Công thức máu', en: 'cbc' }, { vi: 'Labo', en: 'labo' }, { vi: 'Miễn dịch', en: 'immune' }, { vi: 'Siêu âm', en: 'us' },
  { vi: 'X-Quang', en: 'xray' },
  { vi: 'CT-Scan', en: 'ct' }, { vi: 'PET-CT', en: 'pet_ct' }, { vi: 'Giải phẫu bệnh', en: 'patho' }, { vi: 'Đột biến', en: 'mutation' },
  { vi: 'Chẩn đoán', en: 'diagnosis' }, { vi: 'Điều trị', en: 'treatment' }, { vi: 'Theo dõi', en: 'followup' },
  { vi: 'Bệnh nhân yêu cầu', en: 'request' }];

  dateHosToSend: Date;
  selected: any; // for reset the add_view button toggle
  selectDay = new FormControl();

  switchButton = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private kits: KitsService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.clinicForm = this.fb.group({
      dateHos: [Date, Validators.required],
      stt: this.stt,
      record: Number,
      reason: ['', Validators.required],
      history: ['', Validators.required],
      pulse: [Number, Validators.required],
      temp: [Number, Validators.required],
      pressure: '',
      resRate: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      KPS: ['', Validators.required],
      cardio: ['', Validators.required],
      pulmo: ['', Validators.required],
      gastro: ['', Validators.required],
      uro: ['', Validators.required],
      neuro: ['', Validators.required],
      otherSys: ['', Validators.required],
      preDiagnosis: ['', Validators.required]
    });
    if (this.add_view === 'add') {
      this.SubmitButtonCondition = 'ADD';
      this.dataService.getRecord('RETURN_RECORD', 'clinic', this.stt).subscribe(data => {
        this.clinicForm.controls.record.setValue(data);
        this.dateHosToSend = data.dateHos;
        this.clinicForm.controls.dateHos.setValue(new Date());
      }
      );
    } else {
      this.SubmitButtonCondition = 'CHANGE';
      this.dataService.getData('READ_PRE_CLINIC', 'clinic', this.stt, this.day).subscribe(data => {
        data.dateHos = new Date(+data.dateHos); // date number to Locale date
        this.clinicForm.setValue(data);
        this.dateHosToSend = data.dateHos;
      });
    }
  }

  onSubmit(): void {
    const action: string = this.SubmitButtonCondition;
    const formData = this.clinicForm.value;

    // dateHosToSend
    this.dateHosToSend = formData.dateHos;

    // date number to Locale date
    formData.dateHos = this.kits.LocaleTimetoBigINT(formData.dateHos);
    this.dataService.submitButton(action, 'clinic', formData);
    this.SubmitButtonCondition = 'CHANGE';
    alert('Lưu thành công');
  }

  workupTittle(title: string) {
    this.workup.forEach(e => {
      if (e.en === title) {
        return e.vi;
      }
    });
  }


  returnDay(stt: number, table: string) {
    this.store.dispatch(actions.SEND_SELECT_DAY_WORKUP({stt, table, dateHos: this.dateHosToSend.getTime()}));
    this.workupDate$ = this.store.select('dayWorkup');
  }

  reset_add_view() {
    this.selected = undefined;
    this.switchButton = false;
  }

  BigINTtoDay(day: number) {
    return this.kits.BigINTtoLocaleTime(day.toString());
  }

}
