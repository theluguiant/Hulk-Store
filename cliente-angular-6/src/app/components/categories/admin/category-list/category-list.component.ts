import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Token } from '../../../../models/token';


import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../../../redux/actions/uiLogin.actions';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryService]
})
export class CategoryListComponent implements OnInit, OnDestroy {
  private token: Token;
  public allCategories;
  public status;
  public error_type;
  public title: string;
  public cargando: boolean;
  private suscription: Subscription = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _category: CategoryService,
    private _store: Store<AppState>
  ) { 
      this.title = 'Listado de categorias';
    }

  ngOnInit() {
     this.suscription = this._store.select('uiLogin').subscribe( uiLogin => this.cargando = uiLogin.isLoading);
     this.getCategories();
  }

  ngOnDestroy() {
    this.allCategories = null;
    this.status = null;
    this.error_type = null;
    this.token = new Token('');
  }

  getCategories() {
    this._store.dispatch(new ActivarLoadingAction());
    this.token = new Token(localStorage.getItem('token'));
    this._category.listCategories(this.token).subscribe(
      response => {
        switch (response.status) {
          case 'success': {
             this.allCategories = response.payload;
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
        this._category.destroy(id).subscribe(
           response => {
              switch (response.status) {
                case 'success': {
                  this.status = response.status;
                  this.getCategories();
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

  goToEdit(id) {
    this._router.navigate(['/edit-admin-category/'+id]);
  }

}
