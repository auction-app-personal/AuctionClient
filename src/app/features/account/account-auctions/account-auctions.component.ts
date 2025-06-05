import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AuctionDto } from '../../../models/auction/auction.model';
import { Subscription } from 'rxjs';
import { AUCTION_FACADE, AUCTION_SERVICE } from '../../../services/common/injection-tokens';
import { AuctionService } from '../../../services/data/auction/auction-service.interface';
import { AuctionFacadeService } from '../../../services/shared/auction-facade.service';

@Component({
  selector: 'app-account-auctions',
  standalone: true,
  imports: [],
  templateUrl: './account-auctions.component.html',
  styleUrl: './account-auctions.component.scss'
})
export class AccountAuctionsComponent implements OnInit, OnDestroy{
  @Input({ required: true })
  accountId: number | null = null;

  ownedAuctions: AuctionDto[] = [];
  participatedAuctions: AuctionDto[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(@Inject(AUCTION_FACADE) private auctionService: AuctionFacadeService){
    
  }

  ngOnInit(): void {
    const ownedAuctionsSub = this.auctionService.getAuctionsByOwnerId(this.accountId!).subscribe(
      (auctions) => this.ownedAuctions = auctions
    );

    const participatedAuctionsSub = this.auctionService.getAuctionsByParticipantId(this.accountId!).subscribe(
      (auctions) => this.participatedAuctions = auctions
    );

    this.subscriptions.add(ownedAuctionsSub);
    this.subscriptions.add(participatedAuctionsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
