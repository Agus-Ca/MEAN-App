import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  miFormulario: FormGroup = this.formBuilder.group({
    email    : [ '', [ Validators.required, Validators.email ]],
    password : [ '', [ Validators.required, Validators.minLength(6) ]],

  });

  login(): void {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
  }

}