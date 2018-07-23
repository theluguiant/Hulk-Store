import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Product } from '../../../../models/product';
import { ProductErrors } from '../../../../models/productErrors';
import { Token } from '../../../../models/token';


import {ProductService} from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';


import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../../../redux/actions/uiLogin.actions';

@Component({
  selector: 'app-productsadminadd',
  templateUrl: './productsadminadd.component.html',
  styleUrls: ['./productsadminadd.component.css']
})
export class ProductsadminaddComponent implements OnInit, OnDestroy {
  public title: string;
  public model_controller: Product;
  public errorRegister: ProductErrors;
  public status: string;
  public status_submit = true;
  public error = [];
  public msn_success;
  public msn_error;
  public type;
  public inputs;
  public show_form = false;
  public cargando: boolean;
  public allCategories;
  public token: Token = new Token(null);
  private suscription: Subscription = new Subscription();

  constructor(
    private _productservice: ProductService,
    private _category: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<AppState>,
  ) {
    this.title = 'Registrar categoria';
    this.model_controller = new Product( '', '', '', 0, 0, 0, '', '', '' );
    this.errorRegister = new ProductErrors('', '', '', '', '', '', '', '', '');
    this.getCategories();
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
     this.model_controller = new Product( '', '', '', 0, 0, 0, '', '', '' );
     this.errorRegister = new ProductErrors('', '', '', '', '', '', '', '', '');
   }

  getCategories() {
    this.token = new Token(localStorage.getItem('token'));
    this._category.listCategories(this.token).subscribe(
      response => {
        switch (response.status) {
          case 'success': {
             this.allCategories = response.payload;
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

  }

  onSubmit(form) {
     this.status_submit  = false;
        this._store.dispatch(new ActivarLoadingAction());
        this._productservice.registrarProduct(this.model_controller).subscribe(
            response => {
                switch (response.status) {
                    case 'success': {
                            this.status = 'success';
                            this.msn_success = 'Categoria agregada con exito';
                            this.model_controller = new Product( '', '', '', 0, 0, 0, '', '', '' );
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
