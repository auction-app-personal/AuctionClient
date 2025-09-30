import { Component, Inject, Input } from '@angular/core';
import { LotDto } from '../../../../models/lot/lot.model';
import { LotCardComponent } from "../../lot-preview/lot-card/lot-card.component";
import { Observable } from 'rxjs';
import { AuctionDto } from '../../../../models/auction/auction.model';
import { AccountDto } from '../../../../models/account/account.model';
import { BidDto } from '../../../../models/bid/bid.model';
import { AuctionFacadeService } from '../../../../services/shared/auction-facade.service';
import { AUCTION_FACADE } from '../../../../services/common/injection-tokens';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-lot-item-expandable',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './lot-item-expandable.component.html',
  styleUrl: './lot-item-expandable.component.scss',
})
export class LotItemExpandableComponent {
  @Input({ required: true })
  lot!: LotDto;

  highestBidInfo$!: Observable<{account: AccountDto| null, bid: BidDto | null }>;

  constructor(@Inject(AUCTION_FACADE) private facade: AuctionFacadeService){

  }

  ngOnInit(): void {
    this.highestBidInfo$ = this.facade.highestBidInfoForLot$(this.lot.id);
  }
}
