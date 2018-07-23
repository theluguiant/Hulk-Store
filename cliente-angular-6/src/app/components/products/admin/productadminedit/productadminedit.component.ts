import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Product } from '../../../../models/product';
import { ProductErrors } from '../../../../models/productErrors';
import { InputGroup } from '../../../../forms/category/InputGroup';
import { Token } from '../../../../models/token';

// Services
import {ProductService} from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';

// ngrx and redux
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../../../redux/actions/uiLogin.actions';


@Component({
  selector: 'app-productadminedit',
  templateUrl: './productadminedit.component.html',
  styleUrls: ['./productadminedit.component.css']
})
export class ProductadmineditComponent implements OnInit, OnDestroy {
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
  private id: string;
  public status_page: boolean;

  constructor(
    private _productservice: ProductService,
    private _category: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<AppState>,
  ) {
      this.title = 'Editar producto';
      this.model_controller = new Product( '', '', '', 0, 0, 0, '', '', '' );
      this.errorRegister = new ProductErrors('', '', '', '', '', '', '', '', '');
      this._route.params.subscribe(
            params => {
             this.id =  params['id'];
            });
      this.getCategories();
      this.getProduct();
   }

  ngOnDestroy() {
     this.suscription.unsubscribe();
     this.model_controller = new Product( '', '', '', 0, 0, 0, '', '', '' );
     this.errorRegister = new ProductErrors('', '', '', '', '', '', '', '', '');
   }

  ngOnInit() {
      this.suscription = this._store.select('uiLogin').subscribe( uiLogin => this.cargando = uiLogin.isLoading);
      if (localStorage.getItem('token')) {
          this.token = new Token(localStorage.getItem('token'));
      } else {
         this._router.navigate(['']);
      }
  }

  getProduct() {
       this._store.dispatch(new ActivarLoadingAction());
       this._productservice.getProduct(this.id).subscribe(
          response => {
              switch (response.status) {
                    case 'success': {
                      this.status_page = response.status;
                      if( response.payload === null){
                            this._store.dispatch(new DesactivarLoadingAction());
                            this._router.navigate(['/products-list-admin']);
                      }else{
                         this.model_controller = response.payload;
                      }
                      this._store.dispatch(new DesactivarLoadingAction());
                  break;
              }
              case 'error': {
                      this.status_page = response.status;
                       this._store.dispatch(new DesactivarLoadingAction());
                      this._router.navigate(['/products-list-admin']);
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
        this._productservice.updateProduct(this.model_controller, this.id).subscribe(
            response => {
                switch (response.status) {
                    case 'success': {
                            this.status = 'success';
                            this.msn_success = 'Producto editado con exito';
                            if( response.payload === null){
                                this._store.dispatch(new DesactivarLoadingAction());
                                this._router.navigate(['/products-list-admin']);
                            }else{
                              this.model_controller = response.payload[0];
                            }
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
        this.status = null;
  }

}
