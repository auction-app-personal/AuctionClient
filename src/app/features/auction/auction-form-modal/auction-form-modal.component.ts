import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AUCTION_SERVICE } from '../../../services/common/injection-tokens';
import { AuctionService } from '../../../services/data/auction/auction-service.interface';
import { AuctionStatus } from '../../../models/auction/auction.model';

@Component({
  selector: 'app-auction-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auction-form-modal.component.html',
  styleUrl: './auction-form-modal.component.scss'
})
export class AuctionFormModalComponent implements OnInit {

  @Input({required: true}) accountId = 0;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();


  auctionForm!: FormGroup;
  auctionName!: FormControl;
  auctionDescr!: FormControl;
  auctionStartTimestamp!: FormControl;
  auctionDuration!: FormControl;

  constructor(@Inject(AUCTION_SERVICE) private auctionService: AuctionService){

  }

  ngOnInit(): void {
    this.auctionForm = new FormGroup({
      name: new FormControl(this.auctionName, [Validators.required]),
      description: new FormControl(this.auctionDescr),
      startTimestamp: new FormControl(this.auctionStartTimestamp),
      duration: new FormControl(this.auctionDuration),
    });
  }

  saveAuction(): void {
    this.auctionService.create({
      id: 0,
      name: this.auctionForm.value["name"],
      description: this.auctionForm.value["description"],
      startTimestamp: this.auctionForm.value["startTimestamp"],
      duration: this.auctionForm.value["duration"],
      status: AuctionStatus.CREATED,
      ownerId: this.accountId
    }).subscribe(
      (value) => {
        if(value.id === 0){
          console.log('fail')
        } else {
          this.save.emit()
          this.close.emit();
        }
      }
    );
  }

  closeModal(): void {
	  this.close.emit();
  }
}
