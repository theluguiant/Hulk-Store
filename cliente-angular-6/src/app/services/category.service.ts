import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../config/globals';
import { Params } from '@angular/router';
import { CategoryAdmin } from '../models/categoryadmin'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private url: string;
    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    listCategories(token): Observable<any> {
       if (localStorage.getItem('token')) {
            let json = JSON.stringify(token);
            let params = 'json=' + json;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.post(this.url + '/api/get-all-categories', params, {headers: headers});
        } else {
            return null;
        }
    }

    create(category): Observable<any> {
        let json = JSON.stringify(category);
        let params = 'json=' + json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                           .set('Authorization', localStorage.getItem('token') );
            return this._http.post(this.url + '/api/category-create', params, {headers: headers});

    }

    destroy(id): Observable<any> {
        let data = {
            id_category: id
        };
        let json = JSON.stringify(data);
        let params = 'json=' + json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                           .set('Authorization', localStorage.getItem('token') );
            return this._http.post(this.url + '/api/category-delete', params, {headers: headers});
    }

    getCagory(id): Observable<any> {
        let data = {
            id_category: id
        };
        let json = JSON.stringify(data);
        let params = 'json=' + json;
        let headers = new HttpHeaders()
                          .set('Content-Type', 'application/x-www-form-urlencoded')
                          .set('Authorization', localStorage.getItem('token') );
           return this._http.post(this.url + '/api/category-get/'+id, params, {headers: headers});
    }

    updateCagory(category: CategoryAdmin, id): Observable<any> {
        let json = JSON.stringify(category);
        let params = 'json=' + json;
        let headers = new HttpHeaders()
                            .set('Content-Type', 'application/x-www-form-urlencoded')
                            .set('Authorization', localStorage.getItem('token') );

       return this._http.post(this.url + '/api/category-update/' + id , params, {headers: headers});
    }
}
