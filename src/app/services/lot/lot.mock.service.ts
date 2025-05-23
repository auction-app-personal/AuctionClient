import { Injectable } from '@angular/core';
import { LotDto, LotStatus } from '../../models/lot/lot.model';
import { of } from 'rxjs';
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
      status: LotStatus.OPENED,
      auctionId: 1,
    },
    {
      id: 2,
      name: 'Lot 2',
      description: 'Vintage Car',
      startPrice: 15000,
      status: LotStatus.OPENED,
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
      status: LotStatus.CLOSED,
      auctionId: 1,
    },
    {
      id: 5,
      name: 'Lot 5',
      description: 'Exotic Furniture',
      startPrice: 3500,
      status: LotStatus.OPENED,
      auctionId: 1,
    },
    {
      id: 6,
      name: 'Lot 6',
      description: 'Modern Art Piece',
      startPrice: 1200,
      status: LotStatus.OPENED,
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

  public getAll(): Promise<LotDto[]> {
    return Promise.resolve(this.lots);
  }

  public getById(id: number): Promise<LotDto | null> {
    return Promise.resolve(this.lots.find(lot => lot.id === id) || null);
  }

  public create(item: LotDto): Promise<LotDto> {
    const newId = this.lots.length ? Math.max(...this.lots.map(a => a.id)) + 1 : 1;
    item.id = newId;
    this.lots.push(item);
    return Promise.resolve(item);
  }

  public update(id: number, item: LotDto): Promise<LotDto> {
    const oldItem: LotDto | null = this.lots.find(lot => lot.id === id) || null;
    if(oldItem === null) return Promise.reject("Lot not found");
    Object.assign(oldItem, item);
    return Promise.resolve(oldItem);
  }

  public delete(id: number): Promise<void> {
    const originalLength = this.lots.length;
    this.lots = this.lots.filter(lot => lot.id !== id);

    if (this.lots.length === originalLength) {
      return Promise.reject("Lot not found");
    }

    return Promise.resolve();
  }

  public getLotsByAuctionId(auctionId: number) {
    return Promise.resolve(this.lots.filter((x) => x.auctionId === auctionId));
  }
}
