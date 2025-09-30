import { Component, Inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { LotDto } from '../../../../models/lot/lot.model';
import { Observable } from 'rxjs';
import { AccountDto } from '../../../../models/account/account.model';
import { BidDto } from '../../../../models/bid/bid.model';
import { AUCTION_FACADE } from '../../../../services/common/injection-tokens';
import { AuctionFacadeService } from '../../../../services/shared/auction-facade.service';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-lot-item',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './lot-item.component.html',
  styleUrl: './lot-item.component.scss',
})
export class LotItemComponent implements OnInit, OnChanges{
  @Input({ required: true })
  lot!: LotDto;
  bidForm!: FormGroup;

  highestBidInfo$!: Observable<{account: AccountDto| null, bid: BidDto | null }>;

  constructor(@Inject(AUCTION_FACADE) private facade: AuctionFacadeService,
              private authService: AuthService,
              private fb: FormBuilder){

  }
  ngOnChanges(): void {
    this.highestBidInfo$ = this.facade.highestBidInfoForLot$(this.lot!.id);
  }

  ngOnInit(): void {
    this.bidForm = this.fb.group({
      amount: [0, Validators.required],
    });
    this.highestBidInfo$ = this.facade.highestBidInfoForLot$(this.lot!.id);
  }

  
  placeBid(): void {
    
    this.facade.placeBid(this.authService.currentUser()?.id ?? 0, this.lot.id, this.bidForm.get("amount")?.value).subscribe(
      (value) => {
        if(value.id === 0){
          console.log('fail')
          return;
        } else {
          this.bidForm.reset();
        }
      }
    );
  }
  
}
