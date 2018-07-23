import * as fromUiLogin from './redux/reducers/uiLogin.reducer';
import * as fromAuth from './redux/reducers/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    uiLogin: fromUiLogin.State;
    auth: fromAuth.AuthDataState;
}


export const appReducers: ActionReducerMap<AppState> = {
    uiLogin: fromUiLogin.uiLoginReducer,
    auth: fromAuth.authReducer
}