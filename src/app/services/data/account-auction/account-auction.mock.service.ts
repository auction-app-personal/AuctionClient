import { Injectable } from '@angular/core';
import { AccountAuctionService } from './account-auction-service.interface';
import { Observable, of } from 'rxjs';
import { AccountAuctionDto } from '../../../models/account-auction/account-auction.model';

@Injectable({
  providedIn: 'root',
})
export class MockAccountAuctionService implements AccountAuctionService {
  private elemCounter = 3;
  private mockAccountAuctions: AccountAuctionDto[] = [
    {
      accountId: 1,
      auctionId: 1
    },
    {
      accountId: 2,
      auctionId: 1
    },
    {
      accountId: 3,
      auctionId: 1
    },
    {
      accountId: 1,
      auctionId: 2
    }
  ];


  getAll(): Observable<AccountAuctionDto[]> {
    return of(this.mockAccountAuctions); 
  }

  getById(id: number): Observable<AccountAuctionDto | null> {
    return of();
  }

  create(item: AccountAuctionDto): Observable<AccountAuctionDto> {
    this.mockAccountAuctions.push(item);
    return of(item);
  }

  update(id: number, item: AccountAuctionDto): Observable<AccountAuctionDto> {
    return of(item);
  }
  delete(id: number): Observable<void> {
    this.mockAccountAuctions = this.mockAccountAuctions.filter(relation => relation.accountId != id);
    return of();
  }

  deleteByKeys(accountId: number, auctionId: number){
    this.mockAccountAuctions = this.mockAccountAuctions.filter(relation => relation.accountId !== accountId || relation.auctionId !== auctionId);
    return of(void 0);
  }
}
