import { Component, Inject, OnInit } from '@angular/core';
import { AuctionDto } from '../../models/auction/auction.model';
import { AuctionCardComponent } from './auction-card/auction-card.component';
import { AUCTION_SERVICE } from '../../services/common/injection-tokens';
import { AuctionService } from '../../services/data/auction/auction-service.interface';
@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [AuctionCardComponent],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.scss',
})
export class AuctionListComponent implements OnInit {
  auctions: AuctionDto[];

  constructor(@Inject(AUCTION_SERVICE) private auctionService: AuctionService) {
    this.auctions = [];
  }

  ngOnInit(): void {
    this.auctionService.getAll().subscribe(
      (auctions) => this.auctions = auctions
    )
  }
}
