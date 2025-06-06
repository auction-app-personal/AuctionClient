import {  Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { CanActivate, Router } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    const currentUser = this.authService.currentUser;
    if(currentUser() !== null && currentUser()!== undefined){
      return of(true)
    } 
    this.router.navigate(['/login']);
    return of(false);
  }

}