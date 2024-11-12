import { Component, OnInit } from '@angular/core';
import { AuctionDto } from '../../models/auction/auction.model';
import { MockAuctionService } from '../../services/mock-data/mock-auction.service';
import { AuctionCardComponent } from './auction-card/auction-card.component';
@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [AuctionCardComponent],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.scss',
})
export class AuctionListComponent implements OnInit {
  auctions: AuctionDto[];

  constructor(private auctionService: MockAuctionService) {
    this.auctions = [];
  }

  ngOnInit(): void {
    this.auctions = this.auctionService.auctions;
  }
}
