import { Component, Inject } from '@angular/core';
import { AuctionDto, AuctionStatus, AuctionStatusHelpers } from '../../../models/auction/auction.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AUCTION_FACADE, AUCTION_SERVICE } from '../../../services/common/injection-tokens';
import { AuctionService } from '../../../services/data/auction/auction-service.interface';
import { AuctionLotsComponent } from "./auction-lots/auction-lots.component";
import { IconComponent } from "../../../shared/icon/icon.component";
import { Color } from '../../../shared/enums/color.enum';
import { DatePipe, Location } from '@angular/common';
import { AuctionFacadeService } from '../../../services/shared/auction-facade.service';

@Component({
  selector: 'app-auction-edit',
  standalone: true,
  imports: [AuctionLotsComponent, IconComponent, DatePipe],
  templateUrl: './auction-edit.component.html',
  styleUrl: './auction-edit.component.scss'
})
export class AuctionEditComponent {

  Color = Color;
  AuctionStatus = AuctionStatus;

  auction: AuctionDto | null = null;
  auctionStatusHelper = AuctionStatusHelpers;

  paricipants: number = 0;
  totalCollected: number = 0;
  timeRemaining: Date = new Date();

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(AUCTION_SERVICE) private auctionService: AuctionService,
    @Inject(AUCTION_FACADE) private auctionFacade: AuctionFacadeService,
    private route: ActivatedRoute,
    private location: Location
  )  {
    
  }
  ngOnInit(): void {
    const routeSubscription = this.route.paramMap.subscribe((params) => {
      const idVal = params.get('id');
      if (idVal) {
        this.auctionService.getById(parseInt(idVal)).subscribe(
          auction => {
            this.auction = auction;
            if(!this.auction) return;

            this.auctionFacade.getTotalCurrentMoneyCollected(this.auction.id).subscribe(
              (val) => this.totalCollected = val
            )

            this.auctionFacade.getParticipantsByAuctionId(this.auction.id).subscribe(
              (val) => this.paricipants = val.length
            )
          }
        )
      }
    });
    this.subscriptions.add(routeSubscription);
  }

  changeAuctionStatus(status: AuctionStatus){
    if(!this.auction) return;
    this.auction.status = status;
    this.auctionService.update(this.auction.id, this.auction).subscribe(
      (newVal) => this.auction = newVal
    )
  }

  deleteAuction() {
    if(!this.auction) return;
    this.auctionFacade.deleteAuction(this.auction.id).subscribe(
      {
      complete: () => {
        this.location.back();
      }
    }
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
