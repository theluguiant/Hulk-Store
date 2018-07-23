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
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
  providers: [CategoryService]
})
export class CategoryAddComponent implements OnInit, OnDestroy {
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
  public token: Token;
  private suscription: Subscription = new Subscription();

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<AppState>,

  ) {
        this.title = 'Registrar categoria';
        this.model_controller = new CategoryAdmin( '', '' );
        this.errorRegister = new CategoryAdminError( '' , '' );
        this.inputs = InputGroup;
   }

  ngOnInit() {
     this.suscription = this._store.select('uiLogin').subscribe( uiLogin => this.cargando = uiLogin.isLoading);
      if (localStorage.getItem('token')) {
          this.token = new Token(localStorage.getItem('token'));
      } else {
         this._router.navigate(['']);
      }
  }

   ngOnDestroy() {
      this.suscription.unsubscribe();
   }

  onSubmit(form) {
     this.status_submit  = false;
        this._store.dispatch(new ActivarLoadingAction());
        this._categoryService.create(this.model_controller).subscribe(
            response => {
                switch (response.status) {
                    case 'success': {
                            this.status = 'success';
                            this.msn_success = 'Categoria agregada con exito';
                            this.model_controller = new CategoryAdmin( '', '' );
                            this._store.dispatch(new DesactivarLoadingAction());
                            this.status_submit = true;
                            break;
                    }

                    case 'error': {
                        this.msn_error = response.msn;
                        this.status_submit  = true;
                        this.status = response.status;
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
