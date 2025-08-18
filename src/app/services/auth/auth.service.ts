import { computed, Inject, Injectable, signal } from "@angular/core";
import { ACCOUNT_SERVICE } from "../common/injection-tokens";
import { AccountService } from "../data/account/account-service.interface";
import { AccountDto } from "../../models/account/account.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSig = signal<AccountDto | null | undefined>(undefined);
  currentUser = computed(() => this.currentUserSig());

  constructor(
    @Inject(ACCOUNT_SERVICE) private accountService: AccountService) {
      if (typeof window !== 'undefined' && localStorage.getItem('user')) {
        const userId = localStorage.getItem('user');
        if(userId === null) return;
          this.setUserFromStorage(+userId);
      }
    }

  public register(username: string, password: string): number {
    return this.accountService.registerUser(username, password);
  }

  public login(username: string, password: string): number {
    const {
      user,
      token
    } = this.accountService.loginUser(username, password);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user!.id.toString());
    }
    this.currentUserSig.set(user);
    if(!this.currentUser() || token === '')
      return -1; 
    return 0;
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUserSig.set(null);
  }

  private setUserFromStorage(userId: number) {
      if(userId === null) return;
      this.accountService.getById(+userId).subscribe(
        (user) => this.currentUserSig.set(user)
      )

  }
}