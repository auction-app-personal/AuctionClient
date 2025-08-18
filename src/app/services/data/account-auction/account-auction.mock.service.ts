import { Injectable } from '@angular/core';
import { AccountAuctionService } from './account-auction-service.interface';
import { Observable, of } from 'rxjs';
import { AccountAuctionDto } from '../../../models/account-auction/account-auction.model';
import { LocalStorageService } from '../../common/local-storage.service';

const MOCK_ACCOUNT_AUCTION_STORAGE_KEY = "MockAccountAuctions"

@Injectable({
  providedIn: 'root',
})
export class MockAccountAuctionService extends LocalStorageService<AccountAuctionDto> implements AccountAuctionService {
  constructor(){
    super(
      MOCK_ACCOUNT_AUCTION_STORAGE_KEY,
      [
        {
          id: 1,
          accountId: 1,
          auctionId: 1
        },
        {
          id: 2,
          accountId: 2,
          auctionId: 1
        },
        {
          id: 3,
          accountId: 3,
          auctionId: 1
        },
        {
          id: 4,
          accountId: 1,
          auctionId: 2
        }
      ]
    )
  }

  override getById(id: number): Observable<AccountAuctionDto | null> {
    return of();
  }

  override create(item: AccountAuctionDto): Observable<AccountAuctionDto> {
    this.items.push(item);
    this.saveToStorage();
    return of(item);
  }

  override update(id: number, item: AccountAuctionDto): Observable<AccountAuctionDto> {
    return of(item);
  }

  override delete(id: number): Observable<void> {
    this.items = this.items.filter(relation => relation.accountId != id);
    this.saveToStorage();
    return of();
  }

  deleteByKeys(accountId: number, auctionId: number){
    this.items = this.items.filter(relation => relation.accountId !== accountId || relation.auctionId !== auctionId);
    this.saveToStorage();
    return of(void 0);
  }

  override save(accountAuction: AccountAuctionDto): Observable<AccountAuctionDto> {
    return of();
  }
}
