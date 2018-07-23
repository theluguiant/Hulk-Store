
import * as fromUiLogin from '../actions/uiLogin.actions';

export interface State { 
    isLoading: boolean;
 }

 const initState: State = {
    isLoading: false
 }

 export function uiLoginReducer(state = initState, action: fromUiLogin.acciones ): State {

    switch ( action.type) {
        case fromUiLogin.ACTIVAR_LOADING:
            return {
                isLoading: true
            };

        case fromUiLogin.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };

        default:
           return state;
    }

 }