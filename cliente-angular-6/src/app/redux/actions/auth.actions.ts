import { Action } from '@ngrx/store'
import { AuthData } from '../../models/AuthData';


export const SET_USER = '[Auth] Set User';

export class SetUserAction implements Action{
    readonly type = SET_USER;

    constructor(public authData: AuthData) {}
}

export type acciones = SetUserAction;