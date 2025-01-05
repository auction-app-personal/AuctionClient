import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loginField!: FormControl;
  passwordField!: FormControl;
  repeatPasswordField!: FormControl;
  constructor() {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      login: new FormControl(this.loginField, [Validators.required, Validators.email]),
      password: new FormControl(this.passwordField, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('.*[A-Z].*'),
        Validators.pattern('.*[a-z].*'),
        Validators.pattern('.*[0-9].*'),
        Validators.pattern('.*[!@#$%^_+=].*')
      ]),
      repeatPassword: new FormControl(this.repeatPasswordField, Validators.required),
    }, {
      validators: this.passwordsMatch
    });
  }

  onSubmit(): void {
    console.log(this.registerForm)
  }


  passwordsMatch(control: AbstractControl): ValidationErrors | null {
      const password: string = control.get('password')?.value;
      const repeatedPassword: string = control.get('repeatPassword')?.value;
      if(password === repeatedPassword){
        return null;
      }
      return { passwordsMatch: false };
    };

  checkPasswordValidator(validator: string) {
    const passwordVal: string = this.registerForm.controls['password'].value;
    const repeatedPasswordVal: string = this.registerForm.controls[
      'repeatPassword'
    ].value as string;

    if (passwordVal == null || passwordVal == '') return false;

    switch (validator) {
      case 'size':
        return (
          passwordVal != null && passwordVal != '' && passwordVal.length >= 8
        );
      case 'upperchar':
        return RegExp('.*[A-Z]+.*').test(passwordVal);
      case 'lowerchar':
        return RegExp('.*[a-z]+.*').test(passwordVal);
      case 'digit':
        return RegExp('.*[0-9]+.*').test(passwordVal);
      case 'specialchar':
        return RegExp('.*[!@#$%^_+=]+.*').test(passwordVal);
      case 'passwordmatch':
        return passwordVal === repeatedPasswordVal;
      default:
        return false;
    }
  }
}
