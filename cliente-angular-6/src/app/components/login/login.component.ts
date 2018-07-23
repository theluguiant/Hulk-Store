import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Token } from '../../models/token';
import { Login } from '../../models/login';
import { ErrorLogin } from '../../models/errorlogin';
import { InputGroup } from "../../forms/login/InputGroup";
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../redux/actions/uiLogin.actions';
import { SetUserAction } from '../../redux/actions/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    public title: string;
    public status_submit = true;
    public token: Token;
    public login: Login;
    public identity;
    public checkToken;
    public errorLogin: ErrorLogin;
    public status;
    public msn_error;
    public inputs;
    public cargando: boolean;
    private suscription: Subscription = new Subscription();

  constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private store: Store<AppState>
  ) {
        this.title = 'Login';
        this.login  = new Login( '', '');
        this.errorLogin = new ErrorLogin('', '');
        this.inputs = InputGroup;
   }

   ngOnDestroy() {
      this.suscription.unsubscribe();
   }

   ngOnInit() {
        this.suscription = this.store.select('uiLogin').subscribe( uiLogin => this.cargando = uiLogin.isLoading);
        if (localStorage.getItem('token')) {
            this.token = new Token(localStorage.getItem('token'));
            this._router.navigate(['']);
        }
        this.logout();
    }

    onSubmit(form) {
        this.status_submit  = false;
        this.store.dispatch(new ActivarLoadingAction());
        this._userService.signup(this.login).subscribe(
            response => {
                switch (response.status) {
                    case 'success': {
                        if (response.payload.token.status !== 'error') {
                            localStorage.setItem('token',response.payload.token);
                            this.getDataUser();
                            this.status = 'success';
                            this.login  = new Login( '', '');
                            this._router.navigate(['']);
                            this.store.dispatch(new DesactivarLoadingAction());
                        } else {
                            this.msn_error = response.payload.token.message;
                            this.status = 'error';
                            this.status_submit  = true;
                            this.store.dispatch(new DesactivarLoadingAction());
                        }
                        break;
                    }
                    case 'error': {
                        this.msn_error = response.msn;
                        this.status_submit  = true;
                        this.status = response.status;
                        this.errorLogin = response.payload;
                        this.store.dispatch(new DesactivarLoadingAction());
                        break;
                    }
                    
                    default: {
                        this.status_submit  = true;
                        this.store.dispatch(new DesactivarLoadingAction());
                        break;
                    }

                }
            },
            error => {
                console.log(<any>error);
                this.store.dispatch(new DesactivarLoadingAction());
            }
        );
        
        
    }

    getDataUser() {
        if (localStorage.getItem('token')) {
            this.token = new Token(localStorage.getItem('token'));
            this._userService.getIdentity(this.token).subscribe(
                responseTwo => {
                  switch (responseTwo.status) {
                    case 'success': {
                        this.store.dispatch(new SetUserAction(responseTwo.payload));
                        break;
                    }
                    case 'error': {
                      localStorage.removeItem('token');
                      this.identity = null;
                      this.token = null;
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

    logout() {
        this._route.params.subscribe(params => {
            let logout = +params['sure'];
            if (logout === 1) {
                localStorage.removeItem('token');
                this.identity = null;
                this.store.dispatch(new SetUserAction(null));
                this.token = null;
                this._router.navigate(['/login']);
            }
        });
    }

}
