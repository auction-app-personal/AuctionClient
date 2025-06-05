import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { LotDto } from '../../models/lot/lot.model';
import { LOT_SERVICE } from '../../services/common/injection-tokens';
import { LotService } from '../../services/data/lot/lot-service.interface';
import { Subscription } from 'rxjs';
import { LotCardComponent } from './lot-card/lot-card.component';

@Component({
  selector: 'app-lot-list',
  standalone: true,
  imports: [LotCardComponent],
  templateUrl: './lot-list.component.html',
  styleUrl: './lot-list.component.scss'
})
export class LotListComponent implements OnInit, OnDestroy {

  lots: LotDto[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(@Inject(LOT_SERVICE) private lotService: LotService){
    
  }

  ngOnInit(): void {
    const lotsSub = this.lotService.getAll().subscribe(
      (value) => this.lots = value
    );

    this.subscriptions.add(lotsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }



}
