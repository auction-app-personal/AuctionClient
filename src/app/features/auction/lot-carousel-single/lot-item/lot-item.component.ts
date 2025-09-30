import { Component, Inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { LotDto } from '../../../../models/lot/lot.model';
import { Observable } from 'rxjs';
import { AccountDto } from '../../../../models/account/account.model';
import { BidDto } from '../../../../models/bid/bid.model';
import { AUCTION_FACADE } from '../../../../services/common/injection-tokens';
import { AuctionFacadeService } from '../../../../services/shared/auction-facade.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-lot-item',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './lot-item.component.html',
  styleUrl: './lot-item.component.scss',
})
export class LotItemComponent implements OnInit, OnChanges{
  @Input({ required: true })
  lot!: LotDto;

  highestBidInfo$!: Observable<{account: AccountDto| null, bid: BidDto | null }>;

  constructor(@Inject(AUCTION_FACADE) private facade: AuctionFacadeService){

  }
  ngOnChanges(): void {
    this.highestBidInfo$ = this.facade.highestBidInfoForLot$(this.lot!.id);
  }

  ngOnInit(): void {
    this.highestBidInfo$ = this.facade.highestBidInfoForLot$(this.lot!.id);
  }
}
