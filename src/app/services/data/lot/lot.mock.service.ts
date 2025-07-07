import { Injectable } from '@angular/core';
import { LotDto, LotStatus } from '../../../models/lot/lot.model';
import { Observable, of } from 'rxjs';
import { LotService } from './lot-service.interface';

@Injectable({
  providedIn: 'root',
})
export class MockLotService implements LotService{

  private lots: LotDto[] = [
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
  ];

  public getAll(): Observable<LotDto[]> {
    return of(this.lots);
  }

  public getById(id: number): Observable<LotDto | null> {
    return of(this.lots.find(lot => lot.id === id) || null);
  }

  public create(item: LotDto): Observable<LotDto> {
    const newId = this.lots.length ? Math.max(...this.lots.map(a => a.id)) + 1 : 1;
    item.id = newId;
    this.lots.push(item);
    return of(item);
  }

  public update(id: number, item: LotDto): Observable<LotDto> {
    const oldItem: LotDto | null = this.lots.find(lot => lot.id === id) || null;
    if(oldItem === null) return of();
    Object.assign(oldItem, item);
    return of(oldItem);
  }

  public delete(id: number): Observable<void> {
    const originalLength = this.lots.length;
    this.lots = this.lots.filter(lot => lot.id !== id);

    if (this.lots.length === originalLength) {
      return of();
    }

    return of();
  }

  save(lot: LotDto): Observable<LotDto> {
    if(lot.id){
      return this.update(lot.id, lot);
    } else {
      return this.create(lot);
    }
  }

  public getLotsByAuctionId(auctionId: number) {
    return of(this.lots.filter((x) => x.auctionId === auctionId));
  }
}
