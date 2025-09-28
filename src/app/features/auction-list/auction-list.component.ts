import { Component, computed, Inject, OnInit, signal } from '@angular/core';
import { AuctionDto } from '../../models/auction/auction.model';
import { AuctionCardComponent } from './auction-card/auction-card.component';
import { AUCTION_SERVICE } from '../../services/common/injection-tokens';
import { AuctionService } from '../../services/data/auction/auction-service.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [AuctionCardComponent, ReactiveFormsModule],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.scss',
})
export class AuctionListComponent implements OnInit {
  private auctions = signal<AuctionDto[]>([]);

  filterForm!: FormGroup;

  searchName = signal('');
  filterStatus = signal('');
  sortDir = signal<'asc' | 'desc'>('asc');
  sortBy = signal<'Name' | 'Date' | 'Duration'>('Name');

  processedAuctions = computed(() => {
    let list = [...this.auctions()];

    if (this.searchName()) {
      list = list.filter(a =>
        a.name.toLowerCase().includes(this.searchName().toLowerCase())
      );
    }

    if (this.filterStatus() && this.filterStatus() != 'All') {
      list = list.filter(a => a.status === this.filterStatus().toLocaleUpperCase());
    }

    const multiplier = this.sortDir() == 'asc' ? 1 : -1;

    switch (this.sortBy()) {
      case 'Name':
        list.sort((x, y) => multiplier * x.name.localeCompare(y.name));
        break;
      case 'Date':
        list.sort(
          (x, y) => multiplier * (
            new Date(y.startTimestamp ?? 0).getTime() -
            new Date(x.startTimestamp ?? 0).getTime())
        );
        break;
      case 'Duration':
        list.sort((x, y) =>  multiplier * (x.duration - y.duration));
        break;
    }

    return list;
  });


  constructor(@Inject(AUCTION_SERVICE) private auctionService: AuctionService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    
    this.filterForm = this.fb.group({
      searchName: [''],
      filterStatus: ['All'],
      sortBy: ['Name'],
      sortDir: ['asc']
    });

    this.auctionService.getAll().subscribe(
      (auctions) => this.auctions.set(auctions)
    )

    this.filterForm.get('searchName')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(v =>
      this.searchName.set(v ?? '')
    );
    this.filterForm.get('filterStatus')!.valueChanges.subscribe(v =>
      this.filterStatus.set(v ?? 'All')
    );
    this.filterForm.get('sortBy')!.valueChanges.subscribe(v =>
      this.sortBy.set(v ?? 'Name')
    );
    this.filterForm.get('sortDir')!.valueChanges.subscribe(v =>
      this.sortDir.set(v ?? 'asc')
    );
  }
}
