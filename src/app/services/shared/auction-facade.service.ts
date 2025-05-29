import { Inject, Injectable } from "@angular/core";
import { AUCTION_SERVICE, BID_SERVICE, LOT_SERVICE } from "../common/injection-tokens";
import { BidService } from "../bid/bid-service.interface";
import { AuctionService } from "../auction/auction-service.interface";
import { LotService } from "../lot/lot-service.interface";
import { BidDto } from "../../models/bid/bid.model";

@Injectable()
export class AuctionFacadeService {
  constructor(
            @Inject(BID_SERVICE) private bidService: BidService,
            @Inject(AUCTION_SERVICE) private auctionService: AuctionService,
            @Inject(LOT_SERVICE) private lotService: LotService) {

            }

  public async getBidsByAuctionId(auctionId: number): Promise<BidDto[]> {
    const lots = await this.lotService.getLotsByAuctionId(auctionId);
    const lotIds = lots.map(lot => lot.id);

    const bidPromises = lotIds.map(lotId =>
      this.bidService.getBidsByLotId(lotId).catch(() => [])
    );

    const results = await Promise.all(bidPromises);

    return results.flat();
  }
}