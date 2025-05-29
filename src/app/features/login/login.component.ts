import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { log } from 'console';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginField!: FormControl;
  passwordField!: FormControl;

  constructor() {}

  onSubmit() {
    console.log('Submitted');
    console.log(this.loginForm);
    console.log(this.loginField);
    console.log(this.passwordField);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(this.loginField, [Validators.required]),
      password: new FormControl(this.passwordField, [Validators.required]),
    });
  }
}
