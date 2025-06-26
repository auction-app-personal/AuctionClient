import { Component, Inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { AuctionDto } from '../../../models/auction/auction.model';
import { Subscription } from 'rxjs';
import { AUCTION_FACADE } from '../../../services/common/injection-tokens';
import { AuctionFacadeService } from '../../../services/shared/auction-facade.service';
import { AuctionFormModalComponent } from "../../auction/auction-form-modal/auction-form-modal.component";
import { IconComponent } from "../../../shared/icon/icon.component";

@Component({
  selector: 'app-account-auctions',
  standalone: true,
  imports: [AuctionFormModalComponent, IconComponent],
  templateUrl: './account-auctions.component.html',
  styleUrl: './account-auctions.component.scss'
})
export class AccountAuctionsComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription = new Subscription();

  @Input({ required: true })
  accountId: number = 0;

  ownedAuctions = signal<AuctionDto[]>([]);
  participatedAuctions = signal<AuctionDto[]>([]);
  isModalVisible = false;

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

  openAuctionModal(): void {
    document.body.classList.add('modal-open');
	  this.isModalVisible = true;
  }

  hideAuctionModal() {
    document.body.classList.remove('modal-open');
	  this.isModalVisible = false;
  }

  editAuction(): void {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadOwnedAuctions(){
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
