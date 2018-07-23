import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { CategoryAdmin } from '../../../../models/categoryadmin';
import { CategoryAdminError } from '../../../../models/categoryadminerror';
import { CategoryService } from '../../../../services/category.service';
import { InputGroup } from '../../../../forms/category/InputGroup';
import { Token } from '../../../../models/token';


import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../../../redux/actions/uiLogin.actions';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  providers: [CategoryService]
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  public title: string;
  public model_controller: CategoryAdmin;
  public errorRegister: CategoryAdminError;
  public status: string;
  public status_submit = true;
  public error = [];
  public msn_success;
  public msn_error;
  public type;
  public inputs;
  public show_form = false;
  public cargando: boolean;
  public status_page: boolean;
  public token: Token;
  private id: string;
  private suscription: Subscription = new Subscription();

  constructor( 
    private _route: ActivatedRoute,
    private _router: Router,
    private _category: CategoryService,
    private _store: Store<AppState>
  ) {
        this.title = 'Editar categoria';
        this.model_controller = new CategoryAdmin( '', '' );
        this.errorRegister = new CategoryAdminError( '' , '' );
        this.inputs = InputGroup;
         this._route.params.subscribe(
            params => {
             this.id =  params['id'];
            });
     }

  ngOnInit() {
      this.suscription = this._store.select('uiLogin').subscribe( uiLogin => this.cargando = uiLogin.isLoading);
      if (localStorage.getItem('token')) {
          this.token = new Token(localStorage.getItem('token'));
          this.getCargory();
      } else {
         this._router.navigate(['']);
      }
  }

   ngOnDestroy() {
      this.suscription.unsubscribe();
   }

   getCargory() {
       this._category.getCagory(this.id).subscribe(
          response => {
              switch (response.status) {
                    case 'success': {
                      this.status_page = response.status;
                      this.model_controller = response.payload; 
                  break;
              }
              case 'error': {
                      this.status_page = response.status;
                      console.log(response);
                  break;
              }
            }
          },
          error => {
            console.log(<any>error);
          }
        );
  }

   onSubmit(form) {
     this.status_submit  = false;
        this._store.dispatch(new ActivarLoadingAction());
        this._category.updateCagory(this.model_controller,this.id).subscribe(
            response => {
                switch (response.status) {
                    case 'success': {
                            this.status = 'success';
                            this.msn_success = 'Categoria editada con exito';
                            this.model_controller = new CategoryAdmin( '', '' );
                            this._store.dispatch(new DesactivarLoadingAction());
                            this.show_form = true;
                            this.status_submit = true;
                            break;
                    }

                    case 'error': {
                        this.msn_error = response.msn;
                        this.status_submit  = true;
                        this.status = response.status;
                        this.show_form = false;
                        this.errorRegister = response.payload;
                        this._store.dispatch(new DesactivarLoadingAction());
                        break;
                    }
                    
                    default: {
                        this.status_submit  = true;
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

}
