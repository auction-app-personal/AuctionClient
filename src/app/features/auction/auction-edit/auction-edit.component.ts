import { Component, Inject } from '@angular/core';
import { AuctionDto } from '../../../models/auction/auction.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { AuthService } from '../../../services/auth/auth.service';
import { ACCOUNT_SERVICE, AUCTION_SERVICE } from '../../../services/common/injection-tokens';
import { AccountService } from '../../../services/data/account/account-service.interface';
import { AuctionService } from '../../../services/data/auction/auction-service.interface';

@Component({
  selector: 'app-auction-edit',
  standalone: true,
  imports: [],
  templateUrl: './auction-edit.component.html',
  styleUrl: './auction-edit.component.scss'
})
export class AuctionEditComponent {
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
