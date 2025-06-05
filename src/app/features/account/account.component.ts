import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/data/account/account-service.interface';
import { ACCOUNT_SERVICE } from '../../services/common/injection-tokens';
import { AccountDto } from '../../models/account/account.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountAuctionsComponent } from "./account-auctions/account-auctions.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccountAuctionsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit, OnDestroy{
  account: AccountDto | null = null;
  private subscriptions: Subscription = new Subscription();


  constructor(
    @Inject(ACCOUNT_SERVICE) private accountService: AccountService,
    private route: ActivatedRoute
  )  {
    
  }
  ngOnInit(): void {
    const routeSubscription = this.route.paramMap.subscribe((params) => {
      const idVal = params.get('id');
      if (idVal) {
        this.accountService.getById(parseInt(idVal)).subscribe(
          account => this.account = account
        )
      }
    });
    this.subscriptions.add(routeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
