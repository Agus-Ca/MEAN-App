import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  miFormulario: FormGroup = this.formBuilder.group({
    email    : [ '', [ Validators.required, Validators.email ]],
    password : [ '', [ Validators.required, Validators.minLength(6) ]],

  });

  login(): void {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    const { email, password } = this.miFormulario.value;

    this.authService.login( email, password ).subscribe(
      resp => {
        console.log( resp );
      }
    );

    this.router.navigateByUrl('/dashboard');
  }

}