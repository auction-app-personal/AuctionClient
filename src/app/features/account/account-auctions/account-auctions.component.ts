import { Component, Inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
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
  accountId: number = 0;

  ownedAuctions = signal<AuctionDto[]>([]);
  participatedAuctions = signal<AuctionDto[]>([]);

  private subscriptions: Subscription = new Subscription();

  constructor(@Inject(AUCTION_FACADE) private auctionService: AuctionFacadeService){
    
  }

  ngOnInit(): void {
    this.loadOwnedAuctions();
    this.loadParticipatedAuctions();
  }

  onOwnedAuctionDelete(auctionId: number): void {
    this.auctionService.deleteAuction(auctionId).subscribe(
      {
        complete: () => {
          this.loadOwnedAuctions();
        }
      }
    );
  }

  onParticipatedAuctionLeave(auctionId: number) {
    this.auctionService.leaveAuction(this.accountId!, auctionId).subscribe(
      {
        complete: () => {
          this.loadParticipatedAuctions();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadOwnedAuctions(){
    this.auctionService.getAuctionsByOwnerId(this.accountId!).subscribe(
      (auctions) => this.ownedAuctions.set(auctions)
    );
  }

  private loadParticipatedAuctions(){
    this.auctionService.getAuctionsByParticipantId(this.accountId!).subscribe(
      (auctions) => this.participatedAuctions.set(auctions)
    );
  }
}
