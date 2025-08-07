import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/data/account/account-service.interface';
import { ACCOUNT_SERVICE } from '../../services/common/injection-tokens';
import { AccountDto } from '../../models/account/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountAuctionsComponent } from "./account-auctions/account-auctions.component";
import { AuthService } from '../../services/auth/auth.service';
import { AccountFormModalComponent } from "./account-form-modal/account-form-modal.component";
import { IconComponent } from "../../shared/icon/icon.component";
import { Color } from '../../shared/enums/color.enum';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccountAuctionsComponent, AccountFormModalComponent, IconComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit, OnDestroy{
  account: AccountDto | null = null;
  private subscriptions: Subscription = new Subscription();
  isModalVisible: boolean = false;
  Color = Color;


  constructor(
    @Inject(ACCOUNT_SERVICE) private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
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

  logout() {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }

  hideAccountModal() {
    document.body.classList.remove('modal-open');
    this.isModalVisible = false;
  }

  openAccountModal() {
    document.body.classList.add('modal-open');
    this.isModalVisible = true;
  }

  reloadInfo() {
    if(!this.account) return;

    this.accountService.getById(this.account.id).subscribe(
      account => this.account = account
    )
  }
}
