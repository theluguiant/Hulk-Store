import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../config/globals';
import { User } from '../models/user';
import { Params } from '@angular/router';
import { Token } from './../models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
public url: string;
    public token;

    constructor(
        public _http: HttpClient
    ) {

        this.url = GLOBAL.url;
    }

    registrarUser(user): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + '/api/register', params, {headers: headers});
    }


    listUsers(): Observable<any> {
       if (localStorage.getItem('token')) {
            this.token = new Token(localStorage.getItem('token'));
            let json = JSON.stringify(this.token);
            let params = 'json=' + json;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.post(this.url + '/api/get-users', params, {headers: headers});
        } else {
            return null;
        }
    }

    destroy(id): Observable<any> {
        let data = {
            id_user: id
        };
        let json = JSON.stringify(data);
        let params = 'json=' + json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                           .set('Authorization', localStorage.getItem('token') );
            return this._http.post(this.url + '/api/user-delete', params, {headers: headers});
    }


    signup (user, gettoken = null ): Observable<any> {
        if (gettoken !== null) {
            user.gettoken = 'true';
        }
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + '/api/login', params, {headers: headers});
    }

    getIdentity(token): Observable<any> {
        if (localStorage.getItem('token')) {
            let json = JSON.stringify(token);
            let params = 'json=' + json;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.post(this.url + '/api/getidentity', params, {headers: headers});
        } else {
            return null;
        }
    }

    getToken() {
        if (localStorage.getItem('token')) {
            this.token = JSON.parse(localStorage.getItem('token'));
        } else {
            this.token = null;
        }
        return this.token;
    }
}
