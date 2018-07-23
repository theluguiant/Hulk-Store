import { AuthData } from '../../models/AuthData';
import * as fromAuth from '../actions/auth.actions';

export interface AuthDataState {
    authData: AuthData
}

const estadoInicial: AuthDataState = {
    authData: null
};

export function authReducer( state = estadoInicial, action: fromAuth.acciones): AuthDataState {

    switch (action.type) {

        case fromAuth.SET_USER:
            return {
               authData: { ... action.authData }
            };

        default:
            return state;
    }

}
