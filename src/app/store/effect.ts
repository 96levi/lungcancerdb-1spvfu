import { DataService } from './../s/data.service';
import { Injectable } from '@angular/core';

import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as actions from './action';
import { exhaustMap, map } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) { }

  @Effect()
  ReturnGeneralInfo$ = createEffect(() => this.actions$.pipe(
    ofType(actions.GET_ALL_GENERAL_INFO),
    exhaustMap(action =>
      this.dataService.getData('READ', action.table).pipe(
        map(
          data => (actions.RETURN_ALL_GENERAL_INFO({ data }))
        )
      )),
  ));

  @Effect()
  ReturnSelectDayClinic$ = createEffect(() => this.actions$.pipe(
    ofType(actions.SEND_SELECT_DAY_CLINIC),
    exhaustMap(action =>
      this.dataService.getDay('GET_DAY_CLINIC', action.stt).pipe(
        map(
          day => (actions.RETURN_SELECT_DAY_CLINIC({ day }))
        )
      )),
  ));

  @Effect()
  ReturnSelectDay$ = createEffect(() => this.actions$.pipe(
    ofType(actions.SEND_SELECT_DAY_WORKUP),
    exhaustMap(action =>
      this.dataService.getDay('GET_DAY_WORKUP', action.stt, action.table, action.dateHos).pipe(
        map(
          day => (actions.RETURN_SELECT_DAY_WORKUP({ date: day, for: 'WORKUP' }))
        )
      )),
  ));
}
