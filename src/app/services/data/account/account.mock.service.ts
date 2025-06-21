import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountService } from './account-service.interface';
import { AccountDto, AccountRole, Gender } from '../../../models/account/account.model';

@Injectable({
  providedIn: 'root',
})
export class MockAccountService implements AccountService {

  private passwordMap: Record<string, string> = {
    admin_alice: 'admin_alice',
    admin: 'admin',
    guest_charlie: 'guest_charlie',
    diana_prince: 'diana_prince',
    evan_w: 'evan_w',
  }

  private mockAccounts: AccountDto[] = [
  {
    id: 1,
    username: "admin_alice",
    email: "alice@example.com",
    role: AccountRole.ADMIN
  },
  {
    id: 2,
    username: "admin",
    name: "Bob",
    surname: "Smith",
    gender: Gender.MALE,
    role: AccountRole.ADMIN
  },
  {
    id: 3,
    username: "guest_charlie",
    dob: new Date("1990-08-15"),
    role: AccountRole.GUEST
  },
  {
    id: 4,
    username: "diana_prince",
    email: "diana@example.com",
    gender: Gender.FEMALE,
    role: AccountRole.USER
  },
  {
    id: 5,
    username: "evan_w",
    name: "Evan",
    surname: "Wright",
    dob: new Date("1985-03-22"),
    gender: Gender.OTHER,
    email: "evan@example.com",
    role: AccountRole.ADMIN
  }
];


  getAll(): Observable<AccountDto[]> {
    return of(this.mockAccounts); 
  }

  getById(id: number): Observable<AccountDto | null> {
    return of(this.mockAccounts.find(account => account.id === id) || null);
  }
  create(item: AccountDto): Observable<AccountDto> {
    const newId = this.mockAccounts.length ? Math.max(...this.mockAccounts.map(a => a.id)) + 1 : 1;
    item.id = newId;
    this.mockAccounts.push(item);
    return of(item); 
  }
  update(id: number, item: AccountDto): Observable<AccountDto> {
    const oldItem: AccountDto | null = this.mockAccounts.find(account => account.id === id) || null;
    if(oldItem === null) return of();
    Object.assign(oldItem, item);
    return of(oldItem);
  }
  delete(id: number): Observable<void> {
    const oldLength = this.mockAccounts.length;
    this.mockAccounts = this.mockAccounts.filter(account => account.id != id);

    if(oldLength === this.mockAccounts.length) return of();

    return of();
  }

  registerUser(username: string, password: string): number {
    if(this.mockAccounts.filter(acc => acc.username === username).length !== 0)
      return 1; //account exists
    this.create(
      {      
        id: 0,
        username: username,
        role: AccountRole.USER
    });
    this.passwordMap[username] = password;
    return 0;
  }

  loginUser(username: string, password: string): { user: AccountDto | null; token: string; } {
    if(this.passwordMap[username] !== password)
      return {user: null, token: ''}; //can't login

    const user = this.mockAccounts.filter(acc => acc.username === username).at(0);
    if(!user) 
      return {user: null, token: ''}; //can't login

    return {
      user: user,
      token: 'TestToken'
    }
  }
}
