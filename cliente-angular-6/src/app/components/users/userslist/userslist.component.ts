import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { UserService } from '../../../services/user.service';

// Models
import {Token} from '../../../models/token';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../../redux/actions/uiLogin.actions';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css'],
  providers: [UserService]
})
export class UserslistComponent implements OnInit, OnDestroy {
  public token: Token;
  public status;
  public error_type;
  public title: string;
  public cargando: boolean;
  public listUsers;
  private suscription: Subscription = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _Userservice: UserService,
    private _store: Store<AppState>
  ) { 
      this.title = 'Listado de usuarios';
    }

  ngOnInit() {
    this.suscription = this._store.select('uiLogin').subscribe( uiLogin => this.cargando = uiLogin.isLoading);
    this.getUsers();
  }

  ngOnDestroy() {

  }

  getUsers() {
    this._store.dispatch(new ActivarLoadingAction());
    this.token = new Token(localStorage.getItem('token'));
    this._Userservice.listUsers().subscribe(
      response => {
        switch (response.status) {
          case 'success': {
             this.listUsers = response.payload;
             this.status = response.status;
             this.error_type = null;
             this._store.dispatch(new DesactivarLoadingAction());
           break;
          }

          case 'error': {
             console.log(response);
             this._store.dispatch(new DesactivarLoadingAction());
           break;
          }
        }
      },
      error => {
       console.log(<any>error);
       this._store.dispatch(new DesactivarLoadingAction());
      }
   );

  }

    delete(id) {
    if (localStorage.getItem('token')) {
      this._route.params.subscribe(
        params => {
        this._Userservice.destroy(id).subscribe(
           response => {
              switch (response.status) {
                case 'success': {
                  this.status = response.status;
                  this.getUsers();
                  this.error_type = null;
                break;
                }
    
                case 'error': {
                  console.log(response);
                break;
                }
              }
           },
           error => {
              console.log(<any>error);
           }
        );
      });
    }
  }


}
