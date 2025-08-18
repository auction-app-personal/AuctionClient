import { Injectable } from '@angular/core';
import { AuctionDto, AuctionStatus } from '../../../models/auction/auction.model';
import { AuctionService } from './auction-service.interface';
import { LocalStorageService } from '../../common/local-storage.service';

const MOCK_AUCTIONS_STORAGE_KEY = 'MockAuctions';

@Injectable({
  providedIn: 'root',
})
export class MockAuctionService extends LocalStorageService<AuctionDto> implements AuctionService  {
  constructor() {
    super(MOCK_AUCTIONS_STORAGE_KEY, 
      [
          {
            id: 1,
            name: 'Luxury Goods Auction',
            description: 'An auction featuring rare and luxury items.',
            startTimestamp: new Date('2024-11-20T10:00:00'),
            duration: 7, // 7 days
            status: AuctionStatus.STARTED,
            ownerId: 1,
          },
          {
            id: 2,
            name: 'Artworks Auction',
            description: 'A collection of fine art pieces for auction.',
            startTimestamp: new Date('2024-11-22T14:00:00'),
            duration: 5,
            status: AuctionStatus.CREATED,
            ownerId: 2,
          },
          {
            id: 3,
            name: 'Antiques Auction',
            description: 'Vintage and rare antiques for sale.',
            startTimestamp: new Date('2024-11-25T09:00:00'),
            duration: 3,
            status: AuctionStatus.PAUSED,
            ownerId: 1,
          }
      ]
    );
  }
}
