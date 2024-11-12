import { Injectable } from '@angular/core';
import { AuctionDto, AuctionStatus } from '../../models/auction/auction.model';

@Injectable({
  providedIn: 'root',
})
export class MockAuctionService {
  private mockAuctions: AuctionDto[] = [
    {
      id: 1,
      name: 'Luxury Goods Auction',
      description: 'An auction featuring rare and luxury items.',
      startTimestamp: new Date('2024-11-20T10:00:00'),
      duration: 7, // 7 days
      status: AuctionStatus.STARTED,
      ownerId: 101,
    },
    {
      id: 2,
      name: 'Artworks Auction',
      description: 'A collection of fine art pieces for auction.',
      startTimestamp: new Date('2024-11-22T14:00:00'),
      duration: 5,
      status: AuctionStatus.CREATED,
      ownerId: 102,
    },
    {
      id: 3,
      name: 'Antiques Auction',
      description: 'Vintage and rare antiques for sale.',
      startTimestamp: new Date('2024-11-25T09:00:00'),
      duration: 3,
      status: AuctionStatus.PAUSED,
      ownerId: 103,
    },
  ];

  get auctions() {
    return this.mockAuctions;
  }
}
