import { Router } from '@angular/router';
import { AppState } from '../../store/app-state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as actions from '../../store/action';

import { KitsService } from './../../s/kits.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource$: Observable<any>;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'name', 'gender', 'birthday', 'action'];

  generalInfoData$: Observable<object>;

  constructor(
    private kit: KitsService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(actions.GET_ALL_GENERAL_INFO({table: 'general_info'}));
    this.dataSource$ = this.store.select('generalInfo');
    this.dataSource$.subscribe(data => (
      this.dataSource = new MatTableDataSource(data)
    ));
  }

  SearchBox(keyword: string) {
    this.dataSource.filter = keyword.trim().toLowerCase();
  }

  BigINTtoLocaleTime(day: any) {
    return this.kit.BigINTtoLocaleTime(day);
  }

  onClickEdit(stt: number) {
    this.router.navigate(['/addpatient', stt]);
  }
}
