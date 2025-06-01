import { Provider } from '@angular/core';
import { MockAuctionService } from '../auction/auction.mock.service';
import { ACCOUNT_AUCTION_SERVICE, ACCOUNT_SERVICE, AUCTION_FACADE, AUCTION_SERVICE, BID_SERVICE, LOT_SERVICE } from './injection-tokens';
import { MockLotService } from '../lot/lot.mock.service';
import { MockBidService } from '../bid/bid.mock.service';
import { AuctionFacadeService } from '../shared/auction-facade.service';
import { MockAccountService } from '../account/account.mock.service';
import { MockAccountAuctionService } from '../account-auction/account-auction.mock.service';

export function provideCommonServices(): Provider[] {
  return [
    {
      provide: AUCTION_SERVICE,
      useClass: true ? MockAuctionService : MockAuctionService
    },
    {
      provide: ACCOUNT_SERVICE,
      useClass: true ? MockAccountService : MockAccountService
    },
    {
      provide: ACCOUNT_AUCTION_SERVICE,
      useClass: true ? MockAccountAuctionService : MockAccountAuctionService
    },
    {
      provide: BID_SERVICE,
      useClass: true ? MockBidService : MockBidService
    },
    {
      provide: LOT_SERVICE,
      useClass: true ? MockLotService : MockLotService
    },
    {
      provide: AUCTION_FACADE,
      useClass: AuctionFacadeService
    }
  ];
}