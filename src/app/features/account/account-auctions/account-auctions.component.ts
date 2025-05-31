import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AuctionDto } from '../../../models/auction/auction.model';
import { Subscription } from 'rxjs';
import { AUCTION_FACADE, AUCTION_SERVICE } from '../../../services/common/injection-tokens';
import { AuctionService } from '../../../services/auction/auction-service.interface';
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

  private subscriptions: Subscription = new Subscription();

  constructor(@Inject(AUCTION_FACADE) private auctionService: AuctionFacadeService){
    
  }

  ngOnInit(): void {
    const auctionsSub = this.auctionService.getAuctionByAccountId(this.accountId!).subscribe(
      (auctions) => this.ownedAuctions = auctions
    );

    this.subscriptions.add(auctionsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
