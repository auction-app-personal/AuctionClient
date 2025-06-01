import { InjectionToken } from "@angular/core";
import { LotService } from "../lot/lot-service.interface";
import { BidService } from "../bid/bid-service.interface";
import { AuctionService } from "../auction/auction-service.interface";
import { AuctionFacadeService } from "../shared/auction-facade.service";
import { AccountService } from "../account/account-service.interface";
import { AccountAuctionService } from "../account-auction/account-auction-service.interface";

export const LOT_SERVICE = new InjectionToken<LotService>('LotService');
export const BID_SERVICE = new InjectionToken<BidService>('BidService');
export const AUCTION_SERVICE = new InjectionToken<AuctionService>('AuctionService');
export const ACCOUNT_AUCTION_SERVICE = new InjectionToken<AccountAuctionService>('AccountAuctionService');
export const AUCTION_FACADE = new InjectionToken<AuctionFacadeService>('AuctionFacadeService');
export const ACCOUNT_SERVICE = new InjectionToken<AccountService>('AccountService');