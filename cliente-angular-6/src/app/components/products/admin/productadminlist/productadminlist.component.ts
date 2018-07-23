import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Product } from '../../../../models/product';
import { ProductErrors } from '../../../../models/productErrors';
import { Token } from '../../../../models/token';


import {ProductService} from '../../../../services/product.service';


import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../../../redux/actions/uiLogin.actions';


@Component({
  selector: 'app-productadminlist',
  templateUrl: './productadminlist.component.html',
  styleUrls: ['./productadminlist.component.css']
})
export class ProductadminlistComponent implements OnInit, OnDestroy {
  private token: Token;
  public allProducts;
  public status;
  public error_type;
  public title: string;
  public cargando: boolean;
  private suscription: Subscription = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,
    private _store: Store<AppState>) { 
      this.title = 'Listado de productos';
    }

  ngOnInit() {
     this.suscription = this._store.select('uiLogin').subscribe( uiLogin => this.cargando = uiLogin.isLoading);
     this.getProducts();
  }

  ngOnDestroy() {
    this.status = null;
    this.token = new Token('');
  }

  getProducts() {
    this._store.dispatch(new ActivarLoadingAction());
    this.token = new Token(localStorage.getItem('token'));
    this._productService.listProducts(this.token).subscribe(
      response => {
        switch (response.status) {
          case 'success': {
             this.allProducts = response.payload;
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
        this._productService.destroy(id).subscribe(
           response => {
              switch (response.status) {
                case 'success': {
                  this.status = response.status;
                  this.getProducts();
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
  }
  
  goToEdit(id) {
    this._router.navigate(['/products-edit-admin/'+id]);
  }
}
