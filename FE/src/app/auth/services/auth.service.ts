import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { Usuario } from '../interfaces/usuario.interface';



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
}