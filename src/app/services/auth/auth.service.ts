import { Inject, Injectable, signal } from "@angular/core";
import { ACCOUNT_SERVICE } from "../common/injection-tokens";
import { AccountService } from "../data/account/account-service.interface";
import { AccountDto } from "../../models/account/account.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUser = signal<AccountDto | null | undefined>(undefined);

  constructor(
    @Inject(ACCOUNT_SERVICE) private accountService: AccountService) {

  }

  public register(username: string, password: string): number {
    return this.accountService.registerUser(username, password);
  }

  public login(username: string, password: string): number {
    const {
      user,
      token
    } = this.accountService.loginUser(username, password);
    localStorage.setItem('token', token);
    this.currentUser.set(user);
    console.log(this.currentUser());
    if(!this.currentUser() || token === '')
      return -1; 
    return 0;
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }
}