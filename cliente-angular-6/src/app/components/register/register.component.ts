import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ErrorRegister } from '../../models/erroregister';
import { InputGroup } from "../../forms/register/inputGroup";

import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public title: string;
    public model_controller: User;
    public errorRegister: ErrorRegister;
    public status: string;
    public status_submit = true;
    public error = [];
    public msn_success;
    public msn_error;
    public type;
    public inputs;
    public show_form = false;
    public cargando: boolean;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private store: Store<AppState>
    ) {
        this.title = 'Formulario de registro';
        this.model_controller = new User( '', '' , '' , '', '' , '' , '', 0 , '' , 0 );
        this.errorRegister = new ErrorRegister( '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' );
        this.inputs = InputGroup;
    }

    ngOnInit() {
        this.store.select('uiLogin').subscribe( uiLogin => this.cargando = uiLogin.isLoading);
        console.log('cargando: ',this.cargando);
        if (localStorage.getItem('token')) {
            this._router.navigate(['']);
        }
    }

    onSubmit(form) {
        /*console.log(this._userService.pruebas());*/
        this.status_submit  = false;
        this._userService.registrarUser(this.model_controller).subscribe(
            response => {

                switch (response.status) {
                    case 'success': {
                            this.status = response.status;
                            this.status_submit  = true;
                            this.errorRegister  = new ErrorRegister( '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' );
                            this.model_controller = new User( '', '' , '' , '', '' , '' , '', 0 , '' , 0 );
                            this.msn_success = response.msn;
                            this.show_form = true;
                        break;
                    }
                    case 'error': {
                            this.status = response.status;
                            this.errorRegister = response.payload;
                            this.type  = response.type;
                            this.status_submit  = true;
                            this.msn_error = response.msn;
                        break;
                    }
                    default: {
                        this.status_submit  = true;
                        break;
                    }

                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}
