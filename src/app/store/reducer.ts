import {
    createReducer, on, Action
} from '@ngrx/store';

import * as actions from './action';

// For get general_info data
export interface GeneralInfoState {
    data: Array<any>;
}

const initialGeneralInfoState: Array<GeneralInfoState> = [
    {
        data: []
    }
];

const GeneralInfo = createReducer(
    initialGeneralInfoState, // initial state
    on(actions.GET_ALL_GENERAL_INFO, data => data),
    on(actions.RETURN_ALL_GENERAL_INFO, (state, { data }) => ([...data])),
);

export function GeneralInfoReducer(State: Array<GeneralInfoState>, action: Action) {
    return GeneralInfo(State, action);
}

// Retrieve select days
export interface SelectDayClinic {
    date: Array<any>;
}

const initialDayClinic: Array<SelectDayClinic> = [
    {
        date: []
    }
];

const SelectDayClinic = createReducer(
    initialDayClinic, // initial state
    on(actions.SEND_SELECT_DAY_CLINIC, data => data),
    on(actions.RETURN_SELECT_DAY_CLINIC, (data, { day }) => ([...day])),
);

export function DayClinicReducer(State: Array<SelectDayClinic>, action: Action) {
    return SelectDayClinic(State, action);
}

// for workup manager
export interface SelectDayWorkupState {
    date: Array<any>;
}

const initialStateWorkup: Array<SelectDayWorkupState> = [
    {
        date: []
    }
];

const SelectDayWorkup = createReducer(
    initialStateWorkup, // initial state
    on(actions.SEND_SELECT_DAY_WORKUP, data => data),
    on(actions.RETURN_SELECT_DAY_WORKUP, (data, { date }) => ([...date])),
);

export function DayWorkupReducer(State: Array<SelectDayWorkupState>, action: Action) {
    return SelectDayWorkup(State, action);
}

