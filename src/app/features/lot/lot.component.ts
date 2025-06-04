import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { LotDto } from '../../models/lot/lot.model';
import { LOT_SERVICE } from '../../services/common/injection-tokens';
import { LotService } from '../../services/lot/lot-service.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lot',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lot.component.html',
  styleUrl: './lot.component.scss'
})
export class LotComponent implements OnInit, OnDestroy{

  lot: LotDto | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(LOT_SERVICE) private lotService: LotService,
    private route: ActivatedRoute
  )  {
    
  }

  ngOnInit(): void {
    const routeSub = this.route.paramMap.subscribe(
      params => {
        const idVal = params.get('id');
        if(idVal){
          this.lotService.getById(+idVal).subscribe(
            lot => this.lot = lot
          )
        }
      }
    );
    this.subscriptions.add(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
