import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../config/globals';
import { User } from '../models/user';
import { Params } from '@angular/router';
import { Token } from './../models/token';
import { Product } from './../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url: string;
  public token;
    constructor(
        public _http: HttpClient
    ) {

        this.url = GLOBAL.url;
    }

    listProducts(token): Observable<any> {
       if (localStorage.getItem('token')) {
            let json = JSON.stringify(token);
            let params = 'json=' + json;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.post(this.url + '/api/get-all-products', params, {headers: headers});
        } else {
            return null;
        }
    }

    registrarProduct(product): Observable<any> {
        let json = JSON.stringify(product);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                           .set('Authorization', localStorage.getItem('token') );

        return this._http.post(this.url + '/api/add-admin-product', params, {headers: headers});
    }

    destroy(id): Observable<any> {
        let data = {
            id_product: id
        };
        let json = JSON.stringify(data);
        let params = 'json=' + json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                           .set('Authorization', localStorage.getItem('token') );
            return this._http.post(this.url + '/api/products-delete', params, {headers: headers});
    }

    getProduct(id): Observable<any> {
        let data = {
            id_product: id
        };
        let json = JSON.stringify(data);
        let params = 'json=' + json;
        let headers = new HttpHeaders()
                          .set('Content-Type', 'application/x-www-form-urlencoded')
                          .set('Authorization', localStorage.getItem('token') );
           return this._http.post(this.url + '/api/product-get/'+id, params, {headers: headers});
    }

   updateProduct(products: Product, id): Observable<any> {
        let json = JSON.stringify(products);
        let params = 'json=' + json;
        let headers = new HttpHeaders()
                            .set('Content-Type', 'application/x-www-form-urlencoded')
                            .set('Authorization', localStorage.getItem('token') );

       return this._http.post(this.url + '/api/products-update/' + id , params, {headers: headers});
    }

}
