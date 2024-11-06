import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  submit() {
    console.log('Submitted');
  }
}
