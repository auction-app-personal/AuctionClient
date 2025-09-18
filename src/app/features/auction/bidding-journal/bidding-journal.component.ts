import { Component, Input } from '@angular/core';
import{BidDto} from '../../../models/bid/bid.model'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-bidding-journal',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './bidding-journal.component.html',
  styleUrl: './bidding-journal.component.scss',
})
export class BiddingJournalComponent {
  @Input({ required: true })
  bids!: BidDto[] | null;
}
