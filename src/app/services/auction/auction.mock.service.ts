import { Injectable } from '@angular/core';
import { AuctionDto, AuctionStatus } from '../../models/auction/auction.model';
import { AuctionService } from './auction-service.interface';

@Injectable({
  providedIn: 'root',
})
export class MockAuctionService implements AuctionService {
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


  getAll(): Promise<AuctionDto[]> {
    return Promise.resolve(this.mockAuctions); 
  }

  getById(id: number): Promise<AuctionDto | null> {
    return Promise.resolve(this.mockAuctions.find(auction => auction.id === id) || null);
  }
  create(item: AuctionDto): Promise<AuctionDto> {
    const newId = this.mockAuctions.length ? Math.max(...this.mockAuctions.map(a => a.id)) + 1 : 1;
    item.id = newId;
    this.mockAuctions.push(item);
    return Promise.resolve(item); 
  }
  update(id: number, item: AuctionDto): Promise<AuctionDto> {
    const oldItem: AuctionDto | null = this.mockAuctions.find(auction => auction.id === id) || null;
    if(oldItem === null) return Promise.reject("Auction not found");
    Object.assign(oldItem, item);
    return Promise.resolve(oldItem);
  }
  delete(id: number): Promise<void> {
    const oldLength = this.mockAuctions.length;
    this.mockAuctions = this.mockAuctions.filter(auction => auction.id != id);

    if(oldLength === this.mockAuctions.length) return Promise.reject("Auction not found");
    
    return Promise.resolve();
  }
}
