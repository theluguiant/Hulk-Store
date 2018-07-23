import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Token } from './models/token';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { map, take, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { Subscription } from 'rxjs';
import { SetUserAction } from './redux/actions/auth.actions';
import { AuthData } from './models/AuthData';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
    public identity: AuthData = new AuthData(null,null);
    public token;
    private suscription: Subscription = new Subscription();

    constructor(
      private _userService: UserService,
      private _route: ActivatedRoute,
      private _router: Router,
      private _store: Store<AppState>
    ) {
      if (localStorage.getItem('token')) {
        this.getDataUser();
        this.token = localStorage.getItem('token');
      } else {
        this.identity = null;
        this.token = null;
      }
    }

   
    logout() {
      if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
      }
      if (localStorage.getItem('identity')) {
          localStorage.removeItem('identity');
      }
      this._router.navigate(['']);
    }

    ngOnInit() {
      if (localStorage.getItem('token')) {
        this.suscription = this._store.select('auth').subscribe( auth => this.identity = auth.authData);
        this.token = localStorage.getItem('token');
      } else {
        this.identity = null;
        this.token = null;
      }
    }


    getDataUser() {
        if (localStorage.getItem('token')) {
            this.token = new Token(localStorage.getItem('token'));
            this._userService.getIdentity(this.token).subscribe(
                responseTwo => {
                  switch (responseTwo.status) {
                    case 'success': {
                        //this.identity = responseTwo.payload;
                        //localStorage.setItem('identity', JSON.stringify(this.identity));
                        this._store.dispatch(new SetUserAction(responseTwo.payload));
                        break;
                    }
                    case 'error': {
                      localStorage.removeItem('token');
                      //localStorage.removeItem('identity');
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

    ngDoCheck() {
      if (localStorage.getItem('token')) {
       // this.identity = JSON.parse(localStorage.getItem('identity'));
        this.suscription = this._store.select('auth').subscribe( auth => this.identity = auth.authData);
        this.token = localStorage.getItem('token');
      } else {
        this.identity = null;
        this.token = null;
      }
    }
}

