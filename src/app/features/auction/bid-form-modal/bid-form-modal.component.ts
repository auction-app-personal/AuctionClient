import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { BidDto } from '../../../models/bid/bid.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AUCTION_FACADE } from '../../../services/common/injection-tokens';
import { AuctionFacadeService } from '../../../services/shared/auction-facade.service';

@Component({
  selector: 'app-bid-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bid-form-modal.component.html',
  styleUrl: './bid-form-modal.component.scss'
})
export class BidFormModalComponent {
  @Input({required: true}) lotId!: number;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();


  bidForm!: FormGroup;

  constructor(@Inject(AUCTION_FACADE) private auctionFacade: AuctionFacadeService,
              private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.bidForm = this.fb.group({
      amount: [0, Validators.required],
    });
  }

  placeBid(): void {
    // this.auctionFacade.placeBid().subscribe(
    //   (value) => {
    //     if(value.id === 0){
    //       console.log('fail')
    //       return;
    //     }
    //     this.save.emit();
    //     this.close.emit();
    //   }
    // );
  }

  closeModal(): void {
    this.close.emit();
  }
}
