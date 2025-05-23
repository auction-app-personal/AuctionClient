import { InjectionToken } from "@angular/core";
import { LotService } from "../lot/lot-service.interface";
import { BidService } from "../bid/bid-service.interface";
import { AuctionService } from "../auction/auction-service.interface";
import { AuctionFacadeService } from "../shared/auction-facade.service";

export const LOT_SERVICE = new InjectionToken<LotService>('LotService');
export const BID_SERVICE = new InjectionToken<BidService>('BidService');
export const AUCTION_SERVICE = new InjectionToken<AuctionService>('AuctionService');
export const AUCTION_FACADE = new InjectionToken<AuctionFacadeService>('AuctionFacadeService');