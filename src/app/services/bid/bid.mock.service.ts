import { Injectable } from '@angular/core';
import { BidDto } from '../../models/bid/bid.model';
import { of } from 'rxjs';
import { BidService } from './bid-service.interface';

@Injectable({
  providedIn: 'root',
})
export class MockBidService implements BidService {
  private bids: BidDto[] = [
    {
      id: 1,
      timeCreated: null,
      lotId: 1,
      lotName: "Lot 1" ,
      accountId: 1,
      accountName: "Josh",
      amount: 15,
      currency: 'UAH'
    },
    {
      id: 2,
      timeCreated: null,
      lotId: 1,
      lotName: "Lot 1" ,
      accountId: 2,
      accountName: "Jack",
      amount: 20,
      currency: 'UAH'
    },
    {
      id: 3,
      timeCreated: null,
      lotId: 1,
      lotName: "Lot 1",
      accountId: 2,
      accountName: "Jack",
      amount: 20,
      currency: 'UAH'
    },
    {
      id: 4,
      timeCreated: null,
      lotId: 1,
      lotName: "Lot 1",
      accountId: 2,
      accountName: "Jack",
      amount: 20,
      currency: 'UAH'
    },
    {
      id: 5,
      timeCreated: null,
      lotId: 1,
      lotName: "Lot 1",
      accountId: 5,
      accountName: "Isabelle",
      amount: 120,
      currency: 'UAH'
    }
  ];

  public getAll(): Promise<BidDto[]> {
    return Promise.resolve(this.bids);
  }

  public getById(id: number): Promise<BidDto | null> {
    return Promise.resolve(this.bids.find(bid => bid.id === id) || null);
  }

  public create(item: BidDto): Promise<BidDto> {
    const newId = this.bids.length ? Math.max(...this.bids.map(a => a.id)) + 1 : 1;
    item.id = newId;
    this.bids.push(item);
    return Promise.resolve(item);
  }

  public update(id: number, item: BidDto): Promise<BidDto> {
    const oldItem: BidDto | null = this.bids.find(bid => bid.id === id) || null;
    if(oldItem === null) return Promise.reject("Bid not found");
    Object.assign(oldItem, item);
    return Promise.resolve(oldItem);
  }

public delete(id: number): Promise<void> {
  const originalLength = this.bids.length;
  this.bids = this.bids.filter(bid => bid.id !== id);

  if (this.bids.length === originalLength) {
    return Promise.reject("Bid not found");
  }

  return Promise.resolve();
}

  public getBidsByLotId(lotId: number): Promise<BidDto[]> {
    return Promise.resolve(this.bids.filter((x) => x.lotId === lotId));
  }
}
