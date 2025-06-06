import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

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

  constructor(private authService: AuthService,
            private router: Router
  ) {}

  onSubmit() {
    const login: string = this.loginForm.value["login"];
    const password: string = this.loginForm.value["password"];
    const errCode = this.authService.login(login, password);
    if(errCode === -1)
      console.log("Wrong Login");
    else
      this.router.navigate(['/home'])
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(this.loginField, [Validators.required]),
      password: new FormControl(this.passwordField, [Validators.required]),
    });
  }
}
