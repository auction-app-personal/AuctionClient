import { Injectable } from '@angular/core';
import { BidDto } from '../../../models/bid/bid.model';
import { Observable, of } from 'rxjs';
import { BidService } from './bid-service.interface';
import { LocalStorageService } from '../../common/local-storage.service';
import { LotDto } from '../../../models/lot/lot.model';

const MOCK_BIDS_STORAGE_KEY = "MockBids"

@Injectable({
  providedIn: 'root',
})
export class MockBidService extends LocalStorageService<BidDto> implements BidService {

  constructor(){
    super(
      MOCK_BIDS_STORAGE_KEY,
      [
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
      ]
    )
  }
  
  public getBidsByLotId(lotId: number): Observable<BidDto[]> {
    return of(this.items.filter((x) => x.lotId === lotId));
  }
}
