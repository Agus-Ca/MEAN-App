import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { Token } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = environment.baseUrl;
  
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  login( email:string, password:string ) {
    const url  = `${ this.baseUrl }/auth`;
    const body = { email, password };
    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( resp => {
          if ( resp.ok ) {
            localStorage.setItem('token', resp.token!);

            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of( err.error.msg ))
      );
  }

  validarToken() {
    const url  = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get( url, { headers } );
  }
}