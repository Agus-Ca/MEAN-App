import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  miFormulario: FormGroup = this.formBuilder.group({
    name     : [ '', [ Validators.required ]],
    email    : [ '', [ Validators.required, Validators.email ]],
    password : [ '', [ Validators.required, Validators.minLength(6) ]]
  });

  register(): void {
    const { name, email, password } = this.miFormulario.value;

    this.authService.register( name, email, password )
      .subscribe( ok => {
          if ( ok === true ) {
            this.router.navigateByUrl('/dashboard');
          } else {
            Swal.fire('Error', ok, 'error');
          }
        }
      );
  }
}