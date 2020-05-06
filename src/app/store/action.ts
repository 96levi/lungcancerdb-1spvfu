import { createAction, props } from '@ngrx/store';

export const GET_ALL_GENERAL_INFO = createAction(
    'GET ALL GENERAL INFO',
    props<{ table: string }>(),
);

export const RETURN_ALL_GENERAL_INFO = createAction(
    'RETURN ALL GENERAL INFO',
    props<{ data: Array<any> }>(),
);

// retrieve days from server
export const SEND_SELECT_DAY_CLINIC = createAction(
    'SEND SELECT DAY CLINIC',
    props<{stt: number}>()
);

export const RETURN_SELECT_DAY_CLINIC = createAction(
    'RETURN SELECT DAY CLINIC',
    props<{day: Array<object>}>()
);

// For Workup Manager
export const SEND_SELECT_DAY_WORKUP = createAction(
    'SEND SELECT DAY WORKUP',
    props<{stt: number, table: string, dateHos: number}>()
);

export const RETURN_SELECT_DAY_WORKUP = createAction(
    'RETURN SELECT DAY WORKUP',
    props<{date: Array<object>, for: string}>()
);
