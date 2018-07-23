import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../config/globals';
import { Token } from './../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   public url: string;
   public token;

   constructor(
        public _http: HttpClient
    ) {

        this.url = GLOBAL.url;
    }

    checkAuth(token): Observable<any> {
     
      if (localStorage.getItem('token')) {
            let json = JSON.stringify(token);
            let params = 'json=' + json;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.post(this.url + '/api/is-auth-admin', params, {headers: headers});
        } else {
            return null;
        }
    }

 
}
