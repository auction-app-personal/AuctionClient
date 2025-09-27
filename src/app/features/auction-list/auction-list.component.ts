import { Component, Inject, OnInit, signal } from '@angular/core';
import { AuctionDto } from '../../models/auction/auction.model';
import { AuctionCardComponent } from './auction-card/auction-card.component';
import { AUCTION_SERVICE } from '../../services/common/injection-tokens';
import { AuctionService } from '../../services/data/auction/auction-service.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [AuctionCardComponent, ReactiveFormsModule],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.scss',
})
export class AuctionListComponent implements OnInit {
  auctions = signal<AuctionDto[]>([]);

  filterForm!: FormGroup;

  constructor(@Inject(AUCTION_SERVICE) private auctionService: AuctionService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    
    this.filterForm = this.fb.group({
      searchName: [''],
      filterStatus: [ ''],
      sortBy: ['Name']
    });

    this.auctionService.getAll().subscribe(
      (auctions) => this.auctions.set(auctions)
    )

    this.filterForm.get('sortBy')!.valueChanges.subscribe(value => {
      this.sortAuctions(value);
    });
  }

  sortAuctions(value: any) {
    switch (value){
      case 'Name': {
        this.auctions().sort((x, y) =>  x.name.localeCompare(y.name));
        break;
      }
      case 'Date':{
        this.auctions().sort((x, y) =>
          new Date(y.startTimestamp ?? 0).getTime() - new Date(x.startTimestamp ?? 0).getTime()
        );
        break;
        
      }
      case 'Duration':{
        this.auctions().sort((x, y) =>  x.duration - y.duration);
        break;
      }
    }
  }
}
