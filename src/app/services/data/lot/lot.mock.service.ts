import { Injectable } from '@angular/core';
import { LotDto, LotStatus } from '../../../models/lot/lot.model';
import { Observable, of } from 'rxjs';
import { LotService } from './lot-service.interface';
import { LocalStorageService } from '../../common/local-storage.service';

const MOCK_LOTS_STORAGE_KEY = 'MockLots';


@Injectable({
  providedIn: 'root',
})
export class MockLotService extends LocalStorageService<LotDto> implements LotService{

  constructor(){
    super(
      MOCK_LOTS_STORAGE_KEY,
      [
        {
          id: 1,
          name: 'Lot 1',
          description: 'Antique Painting',
          startPrice: 500,
          status: LotStatus.AWAITING_AUCTION,
          auctionId: 1,
        },
        {
          id: 2,
          name: 'Lot 2',
          description: 'Vintage Car',
          startPrice: 15000,
          status: LotStatus.AWAITING_AUCTION,
          auctionId: 1,
        },
        {
          id: 3,
          name: 'Lot 3',
          description: 'Rare Coin Collection',
          startPrice: 2000,
          status: LotStatus.SOLD,
          auctionId: 1,
        },
        {
          id: 4,
          name: 'Lot 4',
          description: 'Luxury Watch',
          startPrice: 8000,
          status: LotStatus.CURRENTLY_AUCTIONED,
          auctionId: 1,
        },
        {
          id: 5,
          name: 'Lot 5',
          description: 'Exotic Furniture',
          startPrice: 3500,
          status: LotStatus.AWAITING_AUCTION,
          auctionId: 1,
        },
        {
          id: 6,
          name: 'Lot 6',
          description: 'Modern Art Piece',
          startPrice: 1200,
          status: LotStatus.AWAITING_AUCTION,
          auctionId: 2,
        },
        {
          id: 7,
          name: 'Lot 7',
          description: 'Ancient Sculpture',
          startPrice: 5000,
          status: LotStatus.SOLD,
          auctionId: 3,
        },
      ]
    )
  }

  public getLotsByAuctionId(auctionId: number) {
    return of(this.items.filter((x) => x.auctionId === auctionId));
  }
}
