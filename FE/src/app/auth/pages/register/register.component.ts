import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  miFormulario: FormGroup = this.formBuilder.group({
    name     : [ '', [ Validators.required, Validators.minLength(6) ]],
    email    : [ '', [ Validators.required, Validators.email ]],
    password : [ '', [ Validators.required, Validators.minLength(6) ]]
  });

  register(): void {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    this.router.navigateByUrl('/dashboard');
  }
}