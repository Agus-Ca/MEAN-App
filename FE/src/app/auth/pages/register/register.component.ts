import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  miFormulario: FormGroup = this.formBuilder.group({
    name     : [ '', [ Validators.required, Validators.minLength(6) ]],
    email    : [ '', [ Validators.required, Validators.email ]],
    password : [ '', [ Validators.required, Validators.minLength(6) ]]
  });

  register(): void {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
  }
}