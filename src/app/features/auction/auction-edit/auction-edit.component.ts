import { Component, Inject } from '@angular/core';
import { AuctionDto } from '../../../models/auction/auction.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AUCTION_SERVICE } from '../../../services/common/injection-tokens';
import { AuctionService } from '../../../services/data/auction/auction-service.interface';
import { AuctionLotsComponent } from "./auction-lots/auction-lots.component";
import { IconComponent } from "../../../shared/icon/icon.component";
import { Color } from '../../../shared/enums/color.enum';

@Component({
  selector: 'app-auction-edit',
  standalone: true,
  imports: [AuctionLotsComponent, IconComponent],
  templateUrl: './auction-edit.component.html',
  styleUrl: './auction-edit.component.scss'
})
export class AuctionEditComponent {

  Color = Color;
  auction: AuctionDto | null = null;
  private subscriptions: Subscription = new Subscription();


  constructor(
    @Inject(AUCTION_SERVICE) private auctionService: AuctionService,
    private route: ActivatedRoute
  )  {
    
  }
  ngOnInit(): void {
    const routeSubscription = this.route.paramMap.subscribe((params) => {
      const idVal = params.get('id');
      if (idVal) {
        this.auctionService.getById(parseInt(idVal)).subscribe(
          auction => {
            this.auction = auction
          }
        )
      }
    });
    this.subscriptions.add(routeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
