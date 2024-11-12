import { Component, OnInit } from '@angular/core';
import { AuctionDto } from '../../models/auction/auction.model';
import { MockAuctionService } from '../../services/mock-data/mock-auction.service';
import { ActivatedRoute } from '@angular/router';
import { LotDto } from '../../models/lot/lot.model';
import { MockLotService } from '../../services/mock-data/mock-lot.service';
import { log } from 'console';
import { LotPreviewComponent } from './lot-preview/lot-preview.component';

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [LotPreviewComponent],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.scss',
})
export class AuctionComponent implements OnInit {
  private projectId: number;
  auction: AuctionDto | null = null;
  lots: LotDto[] | null = null;

  constructor(
    private lotService: MockLotService,
    private auctionService: MockAuctionService,
    private route: ActivatedRoute
  ) {
    this.projectId = 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idVal = params.get('id');
      if (idVal) {
        this.projectId = parseInt(idVal);
      }
    });
    this.auction = this.auctionService.auctions[this.projectId];
    this.lotService
      .getLotsByProjectId(this.projectId)
      .subscribe((data) => (this.lots = data));
    console.log(this.lots);
  }
}
