import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuctionDto } from '../../models/auction/auction.model';
import { ActivatedRoute } from '@angular/router';
import { LotDto } from '../../models/lot/lot.model';
import { LotPreviewComponent } from './lot-preview/lot-preview.component';
import { LotTableComponent } from './lot-table/lot-table.component';
import { LotCarouselSingleComponent } from './lot-carousel-single/lot-carousel-single.component';
import { BiddingJournalComponent } from './bidding-journal/bidding-journal.component';
import { BidDto } from '../../models/bid/bid.model';
import { AUCTION_FACADE, AUCTION_SERVICE, LOT_SERVICE } from '../../services/common/injection-tokens';
import { LotService } from '../../services/lot/lot-service.interface';
import { AuctionService } from '../../services/auction/auction-service.interface';
import { AuctionFacadeService } from '../../services/shared/auction-facade.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [
    LotPreviewComponent,
    LotTableComponent,
    LotCarouselSingleComponent,
    BiddingJournalComponent,
  ],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.scss',
})
export class AuctionComponent implements OnInit, OnDestroy {
  private auctionId: number;
  private subscription = new Subscription();
  auction: AuctionDto | null = null;
  lots: LotDto[] | null = null;
  tableView: boolean = true;
  bids: BidDto[] | null = null;
  totalCollected: number = 0;

  constructor(
    @Inject(LOT_SERVICE) private lotService: LotService,
    @Inject(AUCTION_SERVICE) private auctionService: AuctionService,
    @Inject(AUCTION_FACADE) private auctionFacade: AuctionFacadeService,

    private route: ActivatedRoute
  ) {
    this.auctionId = 0;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const routeSubscription = this.route.paramMap.subscribe((params) => {
      const idVal = params.get('id');
      if (idVal) {
        this.auctionId = parseInt(idVal);
      }
    });

    const auctionSub = this.auctionService.getById(this.auctionId)
      .subscribe((value) => this.auction = value);

    const lotSub = this.lotService
      .getLotsByAuctionId(this.auctionId)
      .subscribe((value) => this.lots = value);

    const bidSub = this.auctionFacade.getBidsByAuctionId(this.auctionId)
      .subscribe((value) => this.bids = value);

    const totalCollectedSub = this.auctionFacade.getTotalCurrentMoneyCollected(this.auctionId)
      .subscribe((value) => this.totalCollected = value);

      this.subscription.add(routeSubscription);
      this.subscription.add(auctionSub);
      this.subscription.add(lotSub);
      this.subscription.add(bidSub);
      this.subscription.add(totalCollectedSub);
    }

  joinAuction() {
    console.log('joined');
  }
  showSingle() {
    if (this.tableView) this.tableView = false;
  }
  showTable() {
    if (!this.tableView) this.tableView = true;
  }
}
