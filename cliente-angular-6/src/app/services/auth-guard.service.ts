import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Token } from './../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public autenticado = false;
  public token;
  public auth = false;
  
  constructor(
    private _router: Router,
    public authService: AuthService
  ) { }

  canActivate() {
    this.token = new Token(localStorage.getItem('token'));
    this.authService.checkAuth(this.token).subscribe(
            response => {
               this.auth = response;
            });

    if ( this.auth === false || this.auth === true ) {
        return this.auth;
    } else {
        this._router.navigate(['/login']);
    }
  }

}
