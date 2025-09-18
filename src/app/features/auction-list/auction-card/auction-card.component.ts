import { Component, Input } from '@angular/core';
import { AuctionDto } from '../../../models/auction/auction.model';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-auction-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './auction-card.component.html',
  styleUrl: './auction-card.component.scss'
})
export class AuctionCardComponent {
  @Input({required: true})
  auction!: AuctionDto;
}
