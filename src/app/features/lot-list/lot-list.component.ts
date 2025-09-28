import { Component, computed, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { LotDto } from '../../models/lot/lot.model';
import { LOT_SERVICE } from '../../services/common/injection-tokens';
import { LotService } from '../../services/data/lot/lot-service.interface';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { LotCardComponent } from './lot-card/lot-card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lot-list',
  standalone: true,
  imports: [LotCardComponent, ReactiveFormsModule],
  templateUrl: './lot-list.component.html',
  styleUrl: './lot-list.component.scss'
})
export class LotListComponent implements OnInit, OnDestroy {

  private lots = signal<LotDto[]>([]);

  filterForm!: FormGroup;

  searchName = signal('');
  filterStatus = signal('');
  sortDir = signal<'asc' | 'desc'>('asc');
  sortBy = signal<'Name' | 'Price'>('Name');

  processedLots = computed(() => {
    let list = [...this.lots()];

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
      case 'Price':
        list.sort(
          (x, y) => multiplier * (x.startPrice - y.startPrice)
        );
        break;
    }

    return list;
  });


  private subscriptions: Subscription = new Subscription();

  constructor(@Inject(LOT_SERVICE) private lotService: LotService, private fb: FormBuilder){
    
  }

  ngOnInit(): void {
    const lotsSub = this.lotService.getAll().subscribe(
      (value) => this.lots.set(value)
    );

    this.subscriptions.add(lotsSub);

     this.filterForm = this.fb.group({
      searchName: [''],
      filterStatus: ['All'],
      sortBy: ['Name'],
      sortDir: ['asc']
    });

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
