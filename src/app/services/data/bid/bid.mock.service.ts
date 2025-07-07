import { Injectable } from '@angular/core';
import { BidDto } from '../../../models/bid/bid.model';
import { Observable, of } from 'rxjs';
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

  public getAll(): Observable<BidDto[]> {
    return of(this.bids);
  }

  public getById(id: number): Observable<BidDto | null> {
    return of(this.bids.find(bid => bid.id === id) || null);
  }

  public create(item: BidDto): Observable<BidDto> {
    const newId = this.bids.length ? Math.max(...this.bids.map(a => a.id)) + 1 : 1;
    item.id = newId;
    this.bids.push(item);
    return of(item);
  }

  public update(id: number, item: BidDto): Observable<BidDto> {
    const oldItem: BidDto | null = this.bids.find(bid => bid.id === id) || null;
    if(oldItem === null) return of();
    Object.assign(oldItem, item);
    return of(oldItem);
  }

public delete(id: number): Observable<void> {
  const originalLength = this.bids.length;
  this.bids = this.bids.filter(bid => bid.id !== id);

  if (this.bids.length === originalLength) {
    return of();
  }

  return of();
}

  save(bid: BidDto): Observable<BidDto> {
    if(bid.id){
      return this.update(bid.id, bid);
    } else {
      return this.create(bid);
    }
  }


  public getBidsByLotId(lotId: number): Observable<BidDto[]> {
    return of(this.bids.filter((x) => x.lotId === lotId));
  }
}
