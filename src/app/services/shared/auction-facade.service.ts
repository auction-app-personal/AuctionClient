import { Inject, Injectable } from "@angular/core";
import { ACCOUNT_AUCTION_SERVICE, ACCOUNT_SERVICE, AUCTION_SERVICE, BID_SERVICE, LOT_SERVICE } from "../common/injection-tokens";
import { BidService } from "../bid/bid-service.interface";
import { AuctionService } from "../auction/auction-service.interface";
import { LotService } from "../lot/lot-service.interface";
import { BidDto } from "../../models/bid/bid.model";
import { catchError, filter, forkJoin, map, mergeMap, Observable, of, switchMap } from "rxjs";
import { AccountService } from "../account/account-service.interface";
import { AuctionDto } from "../../models/auction/auction.model";
import { AccountAuctionService } from "../account-auction/account-auction-service.interface";

@Injectable()
export class AuctionFacadeService {
  constructor(
            @Inject(BID_SERVICE) private bidService: BidService,
            @Inject(AUCTION_SERVICE) private auctionService: AuctionService,
            @Inject(ACCOUNT_SERVICE) private accountService: AccountService,
            @Inject(ACCOUNT_AUCTION_SERVICE) private accountAuctionService: AccountAuctionService,
            @Inject(LOT_SERVICE) private lotService: LotService) {

            }

public getBidsByAuctionId(auctionId: number): Observable<BidDto[]> {
  return this.lotService.getLotsByAuctionId(auctionId).pipe(
    switchMap((lots) => {
      const bidRequests = lots.map((lot) =>
        this.bidService.getBidsByLotId(lot.id).pipe(
          catchError(() => of([])) // Handle individual request failure gracefully
        )
      );
      return forkJoin(bidRequests); // Waits for all to complete
    }),
    map((bidsArrays) => bidsArrays.flat()) // Flatten the result
  );
}

  public getTotalCurrentMoneyCollected(auctionId: number): Observable<number> {
      return this.lotService.getLotsByAuctionId(auctionId).pipe(
        switchMap((lots) => {
            const highestBids = lots.map(lot => this.getHighestBidForLot(lot.id));
            return forkJoin(highestBids);
          }
        ),
        map(highestBids => highestBids.reduce((acc, curr) => acc + curr, 0))
      )
  }

  private getHighestBidForLot(lotId: number): Observable<number> {
    return this.bidService.getBidsByLotId(lotId).pipe(
      map(bids => {
        const sorted = bids.map(bid => bid.amount).sort((a, b) => b - a);
        return sorted.at(0) ?? 0;
      })
    );
  }

  getAuctionsByOwnerId(accountId: number): Observable<AuctionDto[]> {
  return this.accountService.getById(accountId).pipe(
    switchMap(account =>
      this.auctionService.getAll().pipe(
          map(auctions => auctions.filter(auction => auction.ownerId === account?.id))
        )
      )
    );
  }

getAuctionsByParticipantId(accountId: number): Observable<AuctionDto[]> {
  return this.accountAuctionService.getAll().pipe(
    map(relations =>
      relations
        .filter(relation => relation.accountId === accountId)
        .map(relation => relation.auctionId)
    ),
    switchMap(auctionIds =>
      forkJoin(auctionIds.map(id =>
        this.auctionService.getById(id)
      ))
    ),
    map(auctions =>
      auctions.filter((a): a is AuctionDto => a !== null && a !== undefined)
    )
  );
}
}