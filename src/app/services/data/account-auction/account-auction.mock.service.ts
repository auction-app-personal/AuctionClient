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

  deleteByKeys(accountId: number, auctionId: number){
    this.items = this.items.filter(relation => relation.accountId !== accountId || relation.auctionId !== auctionId);
    this.saveToStorage();
    return of(void 0);
  }

}
