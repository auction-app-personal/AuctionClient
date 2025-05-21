import { Provider } from '@angular/core';
import { MockAuctionService } from '../auction/auction.mock.service';
import { AUCTION_FACADE, AUCTION_SERVICE, BID_SERVICE, LOT_SERVICE } from './injection-tokens';
import { MockLotService } from '../lot/lot.mock.service';
import { MockBidService } from '../bid/bid.mock.service';
import { AuctionFacadeService } from '../shared/auction-facade.service';

export function provideCommonServices(): Provider[] {
  return [
    {
      provide: AUCTION_SERVICE,
      useClass: true ? MockAuctionService : MockAuctionService
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