import { GeneralInfoState, SelectDayClinic, SelectDayWorkupState } from './reducer';

export interface AppState {
    readonly generalInfo: GeneralInfoState;
    readonly selectDayClinic: SelectDayClinic;
    readonly dayWorkup: SelectDayWorkupState;
}

