import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { KitsService } from './../../s/kits.service';
import { DataService } from './../../s/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as actions from '../../store/action';
import { AppState } from 'src/app/store/app-state';
import { SelectDayClinic } from 'src/app/store/reducer';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { viLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  addPatientForm: FormGroup;
  SubmitButtonCondition = 'ADD';
  stt: number;
  SelectDayClinic$: Observable<SelectDayClinic>;
  dateHos: number;
  selected: any; // for reset the add_view button toggle
  bsRangeValue = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataService,
    private kits: KitsService,
    private store: Store<AppState>,
    private localeService: BsLocaleService
  ) {
    defineLocale('vi', viLocale);
    this.localeService.use('vi');
  }

  ngOnInit(): void {

    this.addPatientForm = this.fb.group({
      dateSet: [Date, Validators.required],
      stt: '',
      name: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      phone: '',
      occupation: ['', Validators.required]
    });
    if (this.route.snapshot.paramMap.get('stt')) {
      this.SubmitButtonCondition = 'CHANGE';
      this.stt = Number(this.route.snapshot.paramMap.get('stt'));
      this.dataService.getData('READ', 'general_info', this.stt).subscribe(data => {
        data.dateSet = new Date(+data.dateSet); // date number to Locale date
        data.birthday = new Date(+data.birthday); // date number to Locale date
        this.addPatientForm.setValue(data);
      });
    } else {
      this.dataService.getData('ADD', 'general_info').subscribe(data => {
        this.addPatientForm.controls.stt.setValue(data);
        this.addPatientForm.controls.dateSet.setValue(new Date());
      });
    }
  }

  onSubmit(): void {
    const action: string = this.SubmitButtonCondition;
    const formData = this.addPatientForm.value;
    //
    this.stt = formData.stt;

    // date number to Locale date
    formData.dateSet = this.kits.LocaleTimetoBigINT(formData.dateSet);
    formData.birthday = this.kits.LocaleTimetoBigINT(formData.birthday);
    this.dataService.submitButton(action, 'general_info', formData);
    this.SubmitButtonCondition = 'CHANGE';
    alert('Lưu thành công');
  }

  clickSelectDay() {
    // for select day clinic
    this.store.dispatch(actions.SEND_SELECT_DAY_CLINIC({ stt: this.stt }));
    this.SelectDayClinic$ = this.store.select('selectDayClinic');
    this.selected = undefined;
    this.bsRangeValue = [];
  }

  BigINTtoLocaleTime(day: any) {
    return this.kits.BigINTtoLocaleTime(day);
  }

  returnFormValue(dateHos: number) {
    this.dateHos = dateHos;
  }
  clickRange() {
    this.dateHos = undefined;
    this.selected = undefined;
  }
  log(value: any) {
    console.log(value);
  }
}
