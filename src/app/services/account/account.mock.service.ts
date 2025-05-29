import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountService } from './account-service.interface';
import { AccountDto, AccountRole, Gender } from '../../models/account/account.model';

@Injectable({
  providedIn: 'root',
})
export class MockAccountService implements AccountService {
  private mockAccounts: AccountDto[] = [
  {
    id: 1,
    username: "admin_alice",
    email: "alice@example.com",
    role: AccountRole.ADMIN
  },
  {
    id: 2,
    username: "bob_s",
    name: "Bob",
    surname: "Smith",
    gender: Gender.MALE,
    role: AccountRole.USER
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
}
